import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/apis/users/entity/user.entity';
import { AuthService } from './\bauth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'nickname' | 'password'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  GoogleLogin(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.buskerSocialLogin({ req, res });
  }
}
