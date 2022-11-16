import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findOne({ userId }) {
    return await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['liked_artist', 'liked_artist.artist'],
    });
  }

  async findOneByEmail({ email }) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async create({ email, password, userImageURL }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.save({
      email,
      password: hashedPassword,
      userImageURL: userImageURL,
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

  async updateWrongPass({ userId, wrong_pass }) {
    wrong_pass++;
    return await this.usersRepository.update({ id: userId }, { wrong_pass });
  }

  async delete({ userId }) {
    const result = await this.usersRepository.delete({ id: userId });
    return result.affected ? true : false;
  }

  async sendEmail({ email, template, authNumber }) {
    const isStored = await this.cacheManager.get(email);
    if (isStored) {
      await this.cacheManager.del(email);
    }
    await this.mailerService.sendMail({
      to: email,
      from: process.env.MAIL_SENDER,
      subject: process.env.MAIL_SUBJECT,
      html: template,
    });

    await this.cacheManager.set(email, authNumber, { ttl: 300 });
    return '인증번호가 발송되었습니다.';
  }

  createAuthNumber() {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  }

  async getTemplate({ email, authNumber }) {
    const template = `
      <h1>안녕하세요. ${email}님</h1>
      <p>회원가입을 위해 인증번호를 입력해주세요.</p>
      <p>인증번호: ${authNumber}</p>
      <p>인증번호는 5분간 유효합니다.</p>
    `;
    return template;
  }

  async verifyAuthNumber({ email, authNumber }) {
    const storedAuthNumber = await this.cacheManager.get(email);
    if (storedAuthNumber === authNumber) {
      await this.cacheManager.del(email);
      return true;
    }
    return false;
  }

  async updatePassword({ userId, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.usersRepository.update(
      { id: userId },
      { password: hashedPassword, wrong_pass: 0 },
    );
    return result.affected ? true : false;
  }
}
