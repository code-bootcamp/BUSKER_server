import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LikeArtistService } from './likeArtist.service';

@Resolver()
export class LikeArtistResolver {
  constructor(private readonly likeArtistService: LikeArtistService) {}

  @Mutation(() => Boolean)
  async artistLikeToggle(
    @Args('status') status: boolean,
    @Args('userId') userId: string,
    @Args('artistId') artistId: string,
  ) {
    if (status) {
      return await this.likeArtistService.delete({ userId, artistId });
    } else {
      return await this.likeArtistService.create({ userId, artistId });
    }
  }
}
