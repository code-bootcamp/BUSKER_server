import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Boolean, { nullable: true })
  is_auth?: boolean;

  @Field(() => Boolean, { nullable: true })
  is_artist?: boolean;

  @Field(() => String, { nullable: true })
  nickname?: string;
}
