import { InputType, PartialType } from '@nestjs/graphql';
import { CreateArtistImageInput } from './createArtistImageInput';

@InputType()
export class UpdateArtistImageInput extends PartialType(
  CreateArtistImageInput,
) {}
