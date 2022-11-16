import { IContext } from 'src/commons/context';
import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { ArtistImageService } from './artistImage.service';
import { Mutation, Resolver, Args, Context } from '@nestjs/graphql';

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
    // @Args('userId') userId: string, //
    @Args({ name: 'url', type: () => String }) url: string,
  ) {
    return await this.artistImageService.create({ url });
  }

  // Update Artist Image API
  // @type ['Mutation']
  // @Param updateArtistImage 이미지를 수정할 아티스트의 ID와 url
  // @return 수정한 아티스트 이미지의 정보
  @Mutation(() => ArtistImage)
  async updateArtistImage(
    @Context() context: IContext,
    @Args('artistId') artistId: string, //
    @Args({ name: 'url', type: () => String }) url: string, //UpdateArtistImageInput,
  ) {
    console.log('!!!!!!!!!!!!!!!!');

    console.log(context.req.user.artistImageId);
    return await this.artistImageService.update({ artistId, url });
  }

  // Delete Artist Image API
  // @type [`Mutation`]
  // @param artistImageId 삭제할 이미지의 id
  // @returns 삭제한 경우 `true`, 아닌 경우 `false`
  @Mutation(() => Boolean)
  async deleteArtistImage(
    @Args('artistImageId') artistImageId: string, //
  ) {
    return await this.artistImageService.delete({ artistImageId });
  }
}
