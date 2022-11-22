import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    // 검증된 accessToken 가져오기
    const accessToken = req.headers['authorization'].replace('bearer ', '');
    const isExpire = await this.cacheManager.get(`accessToken:${accessToken}`);
    if (isExpire) {
      throw new UnauthorizedException('Access Token Expired');
    }
    return { email: payload.email, id: payload.sub, role: payload.role };
  }
}
