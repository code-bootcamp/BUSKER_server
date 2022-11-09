import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
  @Field(() => String)
  active_name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  promotion_url: string;

  @Field(() => String)
  category: string;
}
