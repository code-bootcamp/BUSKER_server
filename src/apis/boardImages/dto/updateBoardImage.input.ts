import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBoardImageInput {
  @Field(() => String)
  boardId: string;

  @Field(() => [String])
  url: string[];
}
