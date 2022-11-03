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

  async findOneByEmail(email) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await this.usersRepository.save({
      email,
      password: hashedPassword,
    });
    return user;
  }
}
