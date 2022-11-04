import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/apis/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
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
    console.log(user);
    if (!user)
      throw new UnprocessableEntityException('해당 이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    if (!isAuth) {
      //
    }

    this.setRefreshToken({ user, res: context.res });
    //
    return this.getAccessToken({ user });
  }
}
