import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMemberImageInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  url: string;
}
