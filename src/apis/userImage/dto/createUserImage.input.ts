import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserImageInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  url: string;
}
