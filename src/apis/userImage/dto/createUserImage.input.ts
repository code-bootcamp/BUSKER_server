import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserImageInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  url: string;
}
