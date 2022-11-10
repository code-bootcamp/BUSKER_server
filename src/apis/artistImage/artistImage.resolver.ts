import { UpdateArtistImageInput } from './dto/updateArtistImageInput';
import { CreateArtistImageInput } from './dto/createArtistImageInput';
import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { ArtistImageService } from './artistImage.service';
import { Mutation, Resolver, Args } from '@nestjs/graphql';

@Resolver()
export class ArtistImageResolver {
  constructor(
    private readonly artistImageService: ArtistImageService, //
  ) {}

  // Create Artist Image API
  // @type ['Mutation']
  // @Param createArtistImageInput 이미지를 등록할 아티스트의 ID와 url
  // @return 아티스트에 등록한 이미지의 정보
  @Mutation(() => ArtistImage)
  async createArtistImage(
    @Args('createArtistImageInput')
    createArtistImageInput: CreateArtistImageInput,
  ) {
    return this.artistImageService.create({ createArtistImageInput });
  }

  // Update Artist Image API
  // @type ['Mutation']
  // @Param updateArtistImage 이미지를 수정할 아티스트의 ID와 url
  // @return 수정한 아티스트 이미지의 정보
  @Mutation(() => ArtistImage)
  async updateArtistImage(
    @Args('updateArtistImageInput')
    updateArtistImageInput: UpdateArtistImageInput,
  ) {
    return await this.artistImageService.update({ updateArtistImageInput });
  }
}
