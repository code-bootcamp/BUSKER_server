import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/gql-auth.guard';
import { CurrentUser } from 'src/commons/types/current.type';
import { LikeArtistService } from './likeArtist.service';

@Resolver()
export class LikeArtistResolver {
  constructor(private readonly likeArtistService: LikeArtistService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async artistLikeToggle(
    @CurrentUser() currentUser,
    @Args('status') status: boolean,
    @Args('artistId') artistId: string,
  ) {
    if (status) {
      return await this.likeArtistService.delete({
        userId: currentUser.id,
        artistId,
      });
    } else {
      const isExist = await this.likeArtistService.findOne({
        userId: currentUser.id,
        artistId,
      });

      if (isExist) {
        throw new UnprocessableEntityException('already exist like');
      }
      return await this.likeArtistService.create({
        userId: currentUser.id,
        artistId,
      });
    }
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteArtistLike(
    @CurrentUser() currentUser,
    @Args('artistId') artistId: string,
  ) {
    return await this.likeArtistService.delete({
      userId: currentUser.id,
      artistId,
    });
  }
}
