import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  role: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'https://i.ibb.co/PYBhzR8/noprofile.jpg',
  })
  memberImageURL: string;
}
