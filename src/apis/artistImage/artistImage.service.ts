import { FilesService } from './../files/files.service';
import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistImageService {
  constructor(
    @InjectRepository(ArtistImage)
    private readonly artistImageRepository: Repository<ArtistImage>,

    private readonly filesService: FilesService,
  ) {}

  async upload({ artistImage }) {
    const url = await this.filesService.uploadFile({
      file: artistImage,
    });
    return url.toString();
  }
}
