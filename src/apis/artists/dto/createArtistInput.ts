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
    defaultValue: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  })
  artistImageURL: string;
}
