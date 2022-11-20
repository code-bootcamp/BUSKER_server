import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  role: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: '93069087-e34c-428f-9636-f7a9d497c733noprofile.jpeg',
  })
  memberImageURL: string;
}
