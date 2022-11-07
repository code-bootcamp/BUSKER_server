import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/apis/users/entity/user.entity';
import { AuthService } from './auth.service';

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
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.buskerSocialLogin({ req, res });
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.buskerSocialLogin({ req, res });
  }

  @Get('/login/apple')
  @UseGuards(AuthGuard('apple'))
  async loginApple(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.buskerSocialLogin({ req, res });
  }

  @Get('/login/facebook')
  @UseGuards(AuthGuard('facebook'))
  async loginFacebook(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.buskerSocialLogin({ req, res });
  }
}
