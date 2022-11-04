import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entity/artist.entity';

@Injectable()
export class ArtistsService {
  @InjectRepository(Artist)
  private readonly artistRepository: Repository<Artist>;

  async findOneWithActiveName({ active_name }) {
    return await this.artistRepository.findOne({ where: { active_name } });
  }

  async create({ active_name, description, promotion_url }) {
    return await this.artistRepository.save({
      active_name,
      description,
      promotion_url,
    });
  }
}
