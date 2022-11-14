import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArtistImageInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  url: string;
}
