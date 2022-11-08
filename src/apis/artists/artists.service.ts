import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { RoleType } from 'src/commons/role/type/role-type';
import { Repository } from 'typeorm';
import { Artist } from './entity/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(UserAuthority)
    private readonly userAuthorityRepository: Repository<UserAuthority>,
    @InjectRepository(ArtistImage)
    private readonly artistImageRepository: Repository<ArtistImage>,
  ) {}

  async findOneWithActiveName({ active_name }) {
    return await this.artistRepository.findOne({ where: { active_name } });
  }

  async create({ active_name, description, promotion_url, userId }) {
    const artist = await this.artistRepository.save({
      active_name,
      description,
      promotion_url,
    });
    await this.userAuthorityRepository.save({
      authority: RoleType.ARTIST,
      userId: userId,
    });
    return artist;
  }

  async findOne({ artistId }) {
    return await this.artistRepository.findOne({ where: { id: artistId } });
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
