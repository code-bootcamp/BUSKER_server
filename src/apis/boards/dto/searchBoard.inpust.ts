import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SearchBoardInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page: number;

  @Field(() => [String], { nullable: true })
  category: string[];

  @Field(() => String, { nullable: true })
  district: string;
}
