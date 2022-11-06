import { ConflictException, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.usersService.findOneByEmail({
      email: createUserInput.email,
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    return await this.usersService.create({ ...createUserInput });
  }

  @Query(() => User)
  async fetchUser(@Args('userId') userId: string) {
    const user = await this.usersService.findOne({ userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const user = await this.usersService.findOne({ userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersService.update({ user, ...updateUserInput });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('userId') userId: string) {
    const user = await this.usersService.findOne({ userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersService.delete({ userId });
  }
}
