import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardImageInput {
  @Field(() => String)
  boardId: string;

  @Field(() => String)
  url: string;
}
