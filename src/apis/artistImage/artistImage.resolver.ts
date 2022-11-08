import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { FilesService } from './../files/files.service';
import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { ArtistImageService } from './artistImage.service';
import { Mutation, Resolver, Args } from '@nestjs/graphql';

@Resolver()
export class ArtistImageResolver {
  constructor(
    private readonly artistImageService: ArtistImageService, //

    private readonly filesService: FilesService,
  ) {}

  @Mutation(() => String)
  uploadBoardImage(
    @Args({ name: 'artistImage', type: () => GraphQLUpload })
    artistImage: FileUpload,
  ) {
    return this.artistImageService.upload({ artistImage });
  }
}
