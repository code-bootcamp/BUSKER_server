import {
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/gql-auth.guard';
import { RoleService } from 'src/commons/role/role.service';
import { RoleType } from 'src/commons/role/type/role-type';
import { CurrentUser } from 'src/commons/types/current.type';
import { CreateUserInput } from './dto/createUserInput';
import { UpdatePasswordInput } from './dto/updatePasswordInput';
import { UpdateUserInput } from './dto/updateUserInput';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly roleService: RoleService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user_ = await this.usersService.findOneByEmail({
      email: createUserInput.email,
    });
    if (user_) {
      throw new ConflictException('User already exists');
    }
    const user = await this.usersService.create({ ...createUserInput });
    this.roleService.create({
      userId: user.id,
      authority: RoleType.USER,
      artistId: null,
    });
    return user;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchUser(@CurrentUser() currentUser) {
    const user = await this.usersService.findOne({ userId: currentUser.id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @CurrentUser() currentUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const user = await this.usersService.findOne({ userId: currentUser.id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersService.update({ user, ...updateUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(@CurrentUser() currentUser) {
    const user = await this.usersService.findOne({ userId: currentUser.id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersService.delete({ userId: currentUser.id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  async SendVerificationEmail(@CurrentUser() currentUser) {
    const authNumber = await this.usersService.createAuthNumber();
    const template = await this.usersService.getTemplate({
      email: currentUser.email,
      authNumber,
    });
    const result = await this.usersService.sendEmail({
      email: currentUser.email,
      template,
      authNumber,
    });

    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async confirmVerificationEmail(
    @Args('authNumber') authNumber: string,
    @CurrentUser() currentUser,
  ) {
    return await this.usersService.verifyAuthNumber({
      email: currentUser.email,
      authNumber,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async resetPassword(
    @CurrentUser() currentUser,
    @Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput,
  ) {
    return await this.usersService.updatePassword({
      userId: currentUser.id,
      ...updatePasswordInput,
    });
  }
}
