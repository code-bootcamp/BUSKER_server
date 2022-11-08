import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './../files/files.service';
import { ArtistImageService } from './artistImage.service';
import { ArtistImageResolver } from './artistImage.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistImage])],
  providers: [
    ArtistImageResolver, //
    ArtistImageService,
    FilesService,
  ],
})
export class ArtistImageModule {}
