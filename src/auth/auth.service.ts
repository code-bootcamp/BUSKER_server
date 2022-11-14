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
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { Repository } from 'typeorm';
import { RoleType } from 'src/commons/role/type/role-type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @InjectRepository(UserAuthority)
    private readonly userAuthorityRepository: Repository<UserAuthority>,
  ) {}

  setRefreshToken({ user, res, req }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    const originList = ['http://localhost:3000', 'https://busker.shop'];
    const origin = req.headers.origin;
    if (originList.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin); //프론트와 연결
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, HEAD, POST, OPTIONS, PUT',
    ); //method 지정
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers',
    );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.chansweb.shop; SameSite=None; Secure; httpOnly;};`,
    );
    return refreshToken;
  }

  async getAccessToken({ user }) {
    const role = await this.userAuthorityRepository.findOne({
      where: { userId: user.id },
    });
    return this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
        role: role.authority,
      },
      { secret: process.env.ACCESS_SECRET, expiresIn: '1h' },
    );
  }

  async buskerLogin({ email, password, context }) {
    // 1. 유저 이메일 확인

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
      this.setRefreshToken({ user, res: context.res, req: context.req });
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

  async buskerSocialLogin({ req, res }) {
    // 1. 회원 조회
    let user = await this.userService.findOneByEmail({ email: req.user.email });

    // 2. 회원가입이 안되어있다면? 자동 회원가입
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        password: req.user.password,
      });
    }

    // 3. 회원가입이 되어있다면? 로그인(refreshToken, accessToken 만들어서 프론트엔드에 주기)
    this.setRefreshToken({ user, res, req });
    res.redirect('http://localhost:5500/login/index.html');
  }
}
