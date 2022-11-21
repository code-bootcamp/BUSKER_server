import {
  CACHE_MANAGER,
  ConflictException,
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
import { User } from 'src/apis/users/entity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @InjectRepository(UserAuthority)
    private readonly userAuthorityRepository: Repository<UserAuthority>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      `refreshToken=${refreshToken}; path=/; domain=.chansweb.shop; SameSite=None; Secure; httpOnly;`,
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
      await this.userService.updatePassword({
        userId: user.id,
        password,
      });
      this.setRefreshToken({
        user,
        res: context.res,
        req: context.req,
      });
      //
      return this.getAccessToken({ user });
    }
  }

  async buskerLogout({ context, res, req }) {
    try {
      const accessToken = await context.req.headers['authorization'].replace(
        'bearer ',
        '',
      );
      const refreshToken = await context.req.headers['cookie'].replace(
        'refreshToken=',
        '',
      );

      const saveAccess = await this.cacheManager.set(
        `accessToken:${accessToken}`,
        'accessToken',
        {
          ttl: 0,
        },
      );

      const saveRefresh = await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl: 0,
        },
      );
      // 쿠키 지움
      const originList = ['http://localhost:3000', 'https://busker.shop'];
      const origin = req.headers.origin;
      if (originList.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin); //프론트와 연결
      }

      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, HEAD, POST, OPTIONS, PUT',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers',
      );
      res.setHeader(
        'Set-Cookie',
        `refreshToken=deleted; path=/; domain=.chansweb.shop; SameSite=None; Secure; httpOnly;`,
      );
      if (saveAccess === 'OK' && saveRefresh === 'OK') {
        return true;
      } else {
        throw new UnauthorizedException('로그아웃을 실패했습니다.');
      }
    } catch (e) {
      throw new ConflictException('해당 사용자의 토큰이 올바르지 않습니다.');
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
        userImageURL: req.user.userImageURL,
      });
    }

    // 3. 회원가입이 되어있다면? 로그인(refreshToken, accessToken 만들어서 프론트엔드에 주기)
    this.setRefreshToken({ user, res, req });
    res.redirect('https://busker.shop');
  }
}
