import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  start_Time: Date;

  @Field(() => Date)
  end_Time: Date;

  @Field(() => [String])
  category: [string];

  // @Field(() => [BoardImage])
  // board_image: [BoardImage];

  // @Field(() => BoardAddress)
  // address: BoardAddress;
}
