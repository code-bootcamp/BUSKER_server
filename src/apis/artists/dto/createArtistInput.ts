import { ArtistImageInput } from './../../artistImage/dto/artistImageInput';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
  @Field(() => String)
  active_name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  promotion_url: string;

  @Field(() => ArtistImageInput, { defaultValue: null })
  artistImage: ArtistImageInput;
}
