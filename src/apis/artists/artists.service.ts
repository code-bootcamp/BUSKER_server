import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/categories.entity';
import { Artist } from './entity/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(UserAuthority)
    private readonly userAuthorityRepository: Repository<UserAuthority>,
  ) {}

  async findOneWithActiveName({ active_name }) {
    return await this.artistRepository.findOne({ where: { active_name } });
  }

  async create({
    active_name,
    description,
    promotion_url,
    category,
    artistImageURL,
  }) {
    return await this.artistRepository.save({
      active_name,
      description,
      promotion_url,
      category,
      artistImageURL,
    });
  }

  async findOne({ artistId }) {
    return await this.artistRepository.findOne({
      where: { id: artistId },
      relations: ['artist_image', 'category', 'member'],
    });
  }

  async update({ artistId, ...updateInput }) {
    const result = await this.artistRepository.update(
      { id: artistId },
      { ...updateInput },
    );
    return result.affected ? true : false;
  }

  async delete({ artistId }) {
    const result = await this.artistRepository.delete({ id: artistId });
    return result.affected ? true : false;
  }
}
