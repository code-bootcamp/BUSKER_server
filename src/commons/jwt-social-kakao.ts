import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'https://chansweb.shop/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    const kakao = profile._json.kakao_account;
    return {
      email: kakao.email,
      password: 'Qwer1234!!',
      userImageURL: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    };
  }
}
