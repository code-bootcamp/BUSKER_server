import { Artist } from 'src/apis/artists/entity/artist.entity';
import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistImageService } from './artistImage.service';
import { ArtistImageResolver } from './artistImage.resolver';
import { Module } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistImage, Artist, UserAuthority])],
  providers: [ArtistImageResolver, ArtistImageService, ArtistsService],

})
export class ArtistImageModule {}
