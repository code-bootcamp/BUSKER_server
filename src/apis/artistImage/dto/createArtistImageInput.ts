import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArtistImageInput {
  @Field(() => String)
  artistId: string;

  @Field(() => String)
  url: string;
}
