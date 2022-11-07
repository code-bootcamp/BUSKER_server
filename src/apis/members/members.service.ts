import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  findOne({ memberId }) {
    return this.membersRepository.findOne({ where: { id: memberId } });
  }

  // 멤버 등록
  async create({ name, role }) {
    return await this.membersRepository.save({
      name,
      role,
    });
  }

  // 멤버 수정
  async update({ memberId, ...updateMemberInput }) {
    const result = await this.membersRepository.update(
      { id: memberId }, //
      { ...updateMemberInput },
    );
    return result.affected ? true : false;
  }

  // 멤버 삭제
  async delete({ memberId }) {
    const result = await this.membersRepository.delete({ id: memberId });
    return result.affected ? true : false;
  }
}
