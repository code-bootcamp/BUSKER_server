import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateArtistImageInput {
  @Field(() => String)
  artistId: string;

  @Field(() => String)
  url: string;
}
