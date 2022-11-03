import { Module } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { ArtistImageResolver } from './artistImage.resolver';

@Module({
  providers: [ArtistImageResolver, ArtistsService],
})
export class ArtistImageModule {}
