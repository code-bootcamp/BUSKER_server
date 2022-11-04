import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/categories.entity';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';
import { Artist } from './entity/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Artist])],
  providers: [ArtistsResolver, ArtistsService],
})
export class ArtistsModule {}
