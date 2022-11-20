import { Artist } from 'src/apis/artists/entity/artist.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

  async findOne({ artistId }) {
    const result = await this.membersRepository.find({
      where: {
        artist: {
          id: artistId,
        },
      },
      relations: ['artist'],
    });
    if (!result)
      throw new UnprocessableEntityException('해당 아티스트가 없습니다.');

    return result;
  }

  // 멤버 등록
  async create({ artistId, createMemberInput }) {
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
  async update({ artistId, ...updateMemberInput }) {
    const result = await this.membersRepository.update(
      { id: artistId }, //
      { ...updateMemberInput },
    );
    return result.affected ? true : false;
  }

  // 멤버 삭제
  async delete({ artistId }) {
    const result = await this.membersRepository.softDelete({ id: artistId });
    return result.affected ? true : false;
  }
}
