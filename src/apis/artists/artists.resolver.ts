import { ConflictException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/gql-auth.guard';
import { RoleService } from 'src/commons/role/role.service';
import { Roles } from 'src/commons/role/roles.decorator';
import { RolesGuard } from 'src/commons/role/roles.guard';
import { RoleType } from 'src/commons/role/type/role-type';
import { CurrentUser } from 'src/commons/types/current.type';
import { ArtistsService } from './artists.service';
import { CreateArtistInput } from './dto/createArtistInput';
import { UpdateArtistInput } from './dto/updateArtistInput';
import { Artist } from './entity/artist.entity';

@Resolver()
export class ArtistsResolver {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly roleService: RoleService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Artist)
  async createArtist(
    @CurrentUser() currentUser: any,
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
  ) {
    const artist_ = await this.artistsService.findOneWithActiveName({
      active_name: createArtistInput.active_name,
    });
    if (artist_) {
      throw new ConflictException('already exist artist');
    }
    const artist = await this.artistsService.create({
      ...createArtistInput,
    });
    await this.roleService.update({
      userId: currentUser.id,
      artistId: artist.id,
      authority: RoleType.ARTIST,
    });
    return artist;
  }
  @Roles(RoleType.ARTIST)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Artist)
  async fetchArtist(@CurrentUser() currentUser) {
    const role = await this.roleService.findOneWithUserId({
      userId: currentUser.id,
    });
    return await this.artistsService.findOne({ artistId: role.artistId });
  }

  @Roles(RoleType.ARTIST)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Artist)
  async updateArtist(
    @CurrentUser() currentUser,
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
  ) {
    const role = await this.roleService.findOneWithUserId({
      userId: currentUser.id,
    });
    return await this.artistsService.update({
      artistId: role.artistId,
      ...updateArtistInput,
    });
  }

  @Roles(RoleType.ARTIST)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteArtist(@CurrentUser() currentUser) {
    const role = await this.roleService.findOneWithUserId({
      userId: currentUser.id,
    });
    return await this.artistsService.delete({ artistId: role.artistId });
  }
}
