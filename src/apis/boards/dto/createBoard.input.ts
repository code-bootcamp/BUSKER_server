import { Field, InputType } from '@nestjs/graphql';
import { BoardAddressInput } from 'src/apis/boardAddress/dto/createboardAddress.input';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;

  @Field(() => Date)
  start_time: Date;

  @Field(() => Date, { nullable: true })
  end_time: Date;

  @Field(() => String)
  categoryId: string;

  @Field(() => BoardAddressInput)
  boardAddressInput: BoardAddressInput;

  @Field(() => [String], { nullable: true })
  boardImageURL: string[];
}
