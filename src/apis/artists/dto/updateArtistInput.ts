import { InputType, PartialType } from '@nestjs/graphql';
import { CreateArtistInput } from './createArtistInput';

@InputType()
export class UpdateArtistInput extends PartialType(
  CreateArtistInput,
  InputType,
) {}
