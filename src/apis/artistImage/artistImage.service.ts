import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistImageService {
  constructor(
    @InjectRepository(ArtistImage)
    private readonly artistImageRepository: Repository<ArtistImage>,
  ) {}

  // Create Artist Image
  // @Param createArtistImageInput 이미지를 등록할 아티스트의 ID와 url
  // @returns `ArtistImage`
  async create({ url }) {
    const aa = await this.artistImageRepository.save({
      // ...artistImage,
      url: url,
      // relations: ['artist'],
    });
    return aa;
  }

  // Update Artist Image API
  // @Param updateArtistImageInput 이미지를 수정할 아티스트의 id와 url
  // @returns `artistImage`
  async update({ artistId, url }) {
    // 기존 Artist Image 가져오기
    const artistImageData = await this.artistImageRepository.findOne({
      where: { url: url },
    });
    console.log(artistImageData);
    if (artistImageData) {
      const aa = await this.artistImageRepository.save({
        artistId: artistId,
        url: url,
        // relations: ['artist'],
      });
      return aa;
    }
    // if (artistImageData) {
    // 기존 이미지 삭제하기
    // this.artistImageRepository.softDelete({
    //   artist: { id: artistId },
    // });
    // 새로운 이미지 저장하기

    // }
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
