import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  role: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  })
  memberImageURL: string;
}
