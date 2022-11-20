import { Field, InputType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@InputType()
export class CreateArtistInput {
  @Field(() => String)
  active_name: string;

  @Field(() => String)
  description: string;

  @IsUrl()
  @Field(() => String)
  promotion_url: string;

  @Field(() => String)
  category: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: '93069087-e34c-428f-9636-f7a9d497c733noprofile.jpeg',
  })
  artistImageURL: string;
}
