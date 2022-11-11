import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  role: string;
}
