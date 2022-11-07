import { Field, InputType } from '@nestjs/graphql';
import { BoardAddressInput } from 'src/apis/boardAddress/dto/createboardAddress.input';

@InputType()
export class CreateBoardInput {
  // @Field(() => String)
  // title: string;

  @Field(() => String)
  contents: string;

  @Field(() => String, { nullable: false })
  start_time: string;

  @Field(() => String, { nullable: false })
  end_time: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  artist: string;

  // @Field(() => [String])
  // board_image: string[];

  @Field(() => BoardAddressInput)
  boardAddressInput: BoardAddressInput;
}
