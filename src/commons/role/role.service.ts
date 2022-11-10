import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuthority } from './entity/userAuthority.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(UserAuthority)
    private readonly userAuthorityRepository: Repository<UserAuthority>,
  ) {}

  async findOneWithUserId({ userId }) {
    return await this.userAuthorityRepository.findOne({ where: { userId } });
  }

  async create({ userId, authority, artistId }) {
    return await this.userAuthorityRepository.save({
      userId,
      authority,
      artistId,
    });
  }

  async update({ userId, authority, artistId }) {
    return await this.userAuthorityRepository.update(
      { userId },
      { authority, artistId },
    );
  }

  async delete({ userId }) {
    const result = await this.userAuthorityRepository.delete({ userId });
    return result.affected ? true : false;
  }
}
