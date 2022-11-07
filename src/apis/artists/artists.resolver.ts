import { ConflictException, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { CreateArtistInput } from './dto/createArtistInput';
import { UpdateArtistInput } from './dto/updateArtistInput';
import { Artist } from './entity/artist.entity';

@Resolver()
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Mutation(() => Artist)
  async createArtist(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
  ) {
    const artist = await this.artistsService.findOneWithActiveName({
      active_name: createArtistInput.active_name,
    });
    if (artist) {
      throw new ConflictException('already exist artist');
    }
    return await this.artistsService.create({ ...createArtistInput });
  }

  @Query(() => Artist)
  async fetchArtist(@Args('artistId') artistId: string) {
    const artist = await this.artistsService.findOne({ artistId });
    if (!artist) {
      throw new NotFoundException('not found artist');
    }
    return artist;
  }

  @Mutation(() => Boolean)
  async updateArtist(
    @Args('artistId') artistId: string,
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
  ) {
    const artist = await this.artistsService.findOne({ artistId });
    if (!artist) {
      throw new NotFoundException('not found artist');
    }
    return await this.artistsService.update({ artistId, ...updateArtistInput });
  }

  @Mutation(() => Boolean)
  async deleteArtist(@Args('artistId') artistId: string) {
    const artist = await this.artistsService.findOne({ artistId });
    if (!artist) {
      throw new NotFoundException('not found artist');
    }
    return await this.artistsService.delete({ artistId });
  }
}
