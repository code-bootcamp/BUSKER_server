import { UpdateArtistImageInput } from './dto/updateArtistImageInput';
import { Artist } from 'src/apis/artists/entity/artist.entity';
import { CreateArtistImageInput } from './dto/createArtistImageInput';
import { FilesService } from './../files/files.service';
import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistImageService {
  constructor(
    @InjectRepository(ArtistImage)
    private readonly artistImageRepository: Repository<ArtistImage>,

    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    private readonly filesService: FilesService,
  ) {}

  // Create Artist Image
  // @Param createArtistImageInput 이미지를 등록할 아티스트의 ID와 url
  // @returns `ArtistImage`
  async create({
    createArtistImageInput,
  }: {
    createArtistImageInput: CreateArtistImageInput;
  }) {
    const { artistId, ...artistImage } = createArtistImageInput;
    const result: ArtistImage = await this.artistImageRepository.save({
      ...artistImage,
      artist: { id: artistId },
      relations: ['artist'],
    });
    return result;
  }

  // Update Artist Image API
  // @Param updateArtistImageInput 이미지를 수정할 아티스트의 id와 url
  // @returns `artistImage`
  async update({
    updateArtistImageInput,
  }: {
    updateArtistImageInput: UpdateArtistImageInput;
  }) {
    const { artistId, ...artistImage } = updateArtistImageInput;

    // 기존 Artist Image 가져오기
    const artistImageDate = await this.artistImageRepository.findOne({
      where: { artist: { id: artistId } },
    });

    if (artistImageDate) {
      // 기존 이미지 삭제하기
      this.artistImageRepository.softDelete({
        artist: { id: artistId },
      });
      // 새로운 이미지 저장하기
      const result: ArtistImage = await this.artistImageRepository.save({
        ...artistImage,
        artist: { id: artistId },
        relations: ['artist'],
      });
      return result;
    }
  }

  // Delete Artist Image
  // @Param artistImageId 삭제할 이미지의 ID
  // @return delete result(`true`, `false`)
  async delete({ artistImageId }: { artistImageId: string }) {
    const result = await this.artistImageRepository.softDelete({
      id: artistImageId,
    });
    return result.affected ? true : false;
  }
}
