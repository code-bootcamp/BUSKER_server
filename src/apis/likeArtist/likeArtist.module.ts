import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeArtist } from './entity/likeArtist.entity';
import { LikeArtistResolver } from './likeArtist.resolver';
import { LikeArtistService } from './likeArtist.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikeArtist])],
  providers: [LikeArtistResolver, LikeArtistService],
})
export class LikeArtistModule {}
