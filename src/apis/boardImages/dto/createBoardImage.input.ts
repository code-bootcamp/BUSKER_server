import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardImageInput {
  @Field(() => String)
  id: string;

  @Field(() => [String])
  url: string[];
}
