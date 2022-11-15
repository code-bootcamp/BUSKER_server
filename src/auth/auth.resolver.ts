import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/context';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/gql-auth.guard';
import { CurrentUser } from 'src/commons/gql-user.param';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    return await this.authService.buskerLogin({
      email,
      password,
      context,
    });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async logout(
    @Context() context: IContext, //
  ) {
    return this.authService.buskerLogout({
      context,
      res: context.res,
      req: context.req,
    });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: any, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
