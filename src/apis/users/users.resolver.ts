import { ConflictException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUserInput';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.usersService.findOneByEmail(createUserInput.email);
    console.log(user);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return await this.usersService.create({ ...createUserInput });
  }
}
