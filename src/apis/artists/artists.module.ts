import { Module } from '@nestjs/common';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';

@Module({
  providers: [ArtistsResolver, ArtistsService],
})
export class ArtistsModule {}
