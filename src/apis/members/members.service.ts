import { Artist } from 'src/apis/artists/entity/artist.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,

    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  findAll() {
    return this.membersRepository.find({
      relations: ['artist'],
    });
  }

  findOne({ memberId }) {
    return this.membersRepository.findOne({ where: { id: memberId } });
  }

  // 멤버 등록
  async create({ artistId, createMemberInput }) {
    console.log('hello world');
    const artist = await this.artistsRepository.findOne({
      where: { id: artistId },
      relations: ['pick_user', 'category'],
    });
    const member = await this.membersRepository.save({
      ...createMemberInput,
      artist,
    });
    return member;
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
    const result = await this.membersRepository.softDelete({ id: memberId });
    return result.affected ? true : false;
  }
}
