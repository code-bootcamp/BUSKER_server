import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/apis/users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  async buskerLogin({ email, password, context }) {
    // 1. 유저 이메일 확인
    console.log(email, password);

    const user = await this.userService.findOneByEmail({ email });
    if (!user)
      throw new UnprocessableEntityException('해당 이메일이 없습니다.');
    const isAuth = await bcrypt.compare(password, user.password);
    console.log(isAuth);
    if (!isAuth) {
      if (user.wrong_pass === 5) {
        throw new UnauthorizedException('비밀번호 재설정이 필요합니다.');
      } else if (user.wrong_pass < 5) {
        await this.userService.updateWrongPass({
          userId: user.id,
          wrong_pass: user.wrong_pass,
        });
        throw new UnauthorizedException(
          `패스워드 오류 ${user.wrong_pass + 1}회`,
        );
      }
    } else {
      this.setRefreshToken({ user, res: context.res });
      //
      return this.getAccessToken({ user });
    }
  }

  async buskerLogout({ context }) {
    try {
      const accessToken = await context.req.headers['authorization'].replace(
        'bearer ',
        '',
      );
      const refreshToken = await context.req.headers['cookie'].replace(
        'refreshToken=',
        '',
      );
      const accessVerification = jwt.verify(accessToken, 'myAccessKey');
      console.log('accessToken OK');
      console.log(jwt.verify(accessToken, 'myAccessKey'));
      const refreshVerification = jwt.verify(refreshToken, 'myRefreshKey');
      console.log('refreshToken OK');
      console.log(jwt.verify(refreshToken, 'myRefreshKey'));

      const currentTime = new Date();
      const currentSec = Math.abs(currentTime.getTime() / 1000);

      const ttl_access = Math.ceil(accessVerification['exp'] - currentSec);
      const ttl_refresh = Math.ceil(refreshVerification['exp'] - currentSec);

      console.log('===============================');
      console.log(ttl_access, ttl_refresh);

      await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
        ttl: ttl_access,
      });

      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl: ttl_refresh,
        },
      );

      return '로그아웃에 성공했습니다.';
    } catch (e) {
      throw new UnauthorizedException('로그아웃을 실패했습니다.');
    }
  }
}
