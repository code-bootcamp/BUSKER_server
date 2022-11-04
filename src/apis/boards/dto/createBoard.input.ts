import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;

  @Field(() => String, { nullable: false })
  start_time: string;

  @Field(() => String, { nullable: false })
  end_time: string;

  @Field(() => [String])
  category: [string];

  // @Field(() => [BoardImage])
  // board_image: [BoardImage];

  // @Field(() => BoardAddress)
  // address: BoardAddress;
}
