import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
export class JwtFacebookStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID, //
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'https://chansweb.shop/login/facebook',
      scope: ['public_profile', 'email'],
      profileFields: ['id', 'email'],
      prompt: 'consent',
    });
  }

  validate(accessToken, refreshToken, public_profile) {
    return {
      email: public_profile.emails[0].value,
      password: 'Qwer1234!!',
      userImageURL: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    };
  }
}
