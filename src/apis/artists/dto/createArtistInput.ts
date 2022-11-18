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
    defaultValue: 'https://i.ibb.co/PYBhzR8/noprofile.jpg',
  })
  artistImageURL: string;
}
