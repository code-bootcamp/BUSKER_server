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
    // 상태가 true면 좋아요를 누른 상태
    // 상태가 false면 좋아요를 누르지 않은 상태
    // 좋아요를 누른 상태에서 좋아요를 누르면 좋아요를 취소
    // 좋아요를 누르지 않은 상태에서 좋아요를 누르면 좋아요를 누름
    if (status) {
      return await this.likeArtistService.delete({ userId, artistId });
    } else {
      return await this.likeArtistService.create({ userId, artistId });
    }
  }
}
