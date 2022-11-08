import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArtistImageInput {
  @Field(() => String, { defaultValue: null })
  url: string;
}
