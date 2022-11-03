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
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'myRefreshKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const refresh = req.headers['cookie'].replace('refreshToken=', '');
    const cache = await this.cacheManager.get(`refreshToken:${refresh}`);

    console.log(refresh);
    console.log(cache);
    console.log(payload); // {email: a@a.com, sub: asdqwd13d1-dad}
    if (cache !== null) {
      throw new UnauthorizedException('로그아웃된 계정입니다.');
    }
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
