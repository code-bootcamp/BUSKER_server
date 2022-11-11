import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMemberImageInput {
  @Field(() => String)
  memberId: string;

  @Field(() => String)
  url: string;
}
