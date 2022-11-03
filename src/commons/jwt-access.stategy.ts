import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, //
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const access = req.headers['authorization'].replace('bearer ', '');
    const cache = await this.cacheManager.get(`accessToken:${access}`);

    // console.log(access);
    // console.log(cache);
    if (cache !== null) {
      throw new UnauthorizedException('로그아웃된 계정입니다.');
    }
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
