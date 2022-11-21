import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeArtist } from './entity/likeArtist.entity';

@Injectable()
export class LikeArtistService {
  constructor(
    @InjectRepository(LikeArtist)
    private readonly likeArtistRepository: Repository<LikeArtist>,
  ) {}

  async findLikesByArtistId({ artistId }) {
    return await this.likeArtistRepository.find({
      where: { artist: artistId },
    });
  }

  async findOne({ userId, artistId }) {
    return await this.likeArtistRepository
      .createQueryBuilder('likeArtist')
      .where('likeArtist.artist = :artistId', { artistId })
      .andWhere('likeArtist.user = :userId', { userId })
      .getOne();
  }

  async findLikesByUserId({ userId }) {
    return await this.likeArtistRepository.find({ where: { user: userId } });
  }

  async create({ userId, artistId }) {
    const result = await this.likeArtistRepository.save({
      user: userId,
      artist: artistId,
    });
    return result ? true : false;
  }

  async delete({ userId, artistId }) {
    const result = await this.likeArtistRepository.delete({
      user: userId,
      artist: artistId,
    });
    return result.affected ? true : false;
  }

  async count({ artistId }) {
    // 아티트의 좋아요 수를 반환하는 함수
    return await this.likeArtistRepository
      .createQueryBuilder('likeArtist')
      .where('likeArtist.artist = :artistId', { artistId })
      .getCount();
  }
}
