import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne({ userId }) {
    return await this.usersRepository.findOne({ where: { id: userId } });
  }
  async findOneByEmail({ email }) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async create({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.save({
      email,
      password: hashedPassword,
    });
    return user;
  }

  async update({ user, ...updateInput }) {
    return await this.usersRepository.save({
      id: user.id,
      ...user,
      ...updateInput,
    });
  }
}
