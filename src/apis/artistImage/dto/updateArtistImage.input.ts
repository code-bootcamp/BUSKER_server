import { CreateArtistInput } from './../../artists/dto/createArtistInput';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateArtistImageInput extends PartialType(CreateArtistInput) {}
