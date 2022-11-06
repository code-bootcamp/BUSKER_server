import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  content: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  boardId: string;
}
