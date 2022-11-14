import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie;
        console.log(cookie);
        const refreshToken = cookie.replace('refreshToken=', '');
        console.log('===============');
        console.log(refreshToken);
        return refreshToken;
      },
      secretOrKey: process.env.REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const refresh = req.headers['cookie'].replace('refreshToken=', '');
    const cache = await this.cacheManager.get(`refreshToken:${refresh}`);

    if (cache) {
      throw new UnauthorizedException('로그아웃된 계정입니다.');
    }
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
