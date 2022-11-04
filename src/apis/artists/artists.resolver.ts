import { ConflictException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { CreateArtistInput } from './dto/createArtistInput';
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
}
