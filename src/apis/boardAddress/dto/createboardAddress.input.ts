import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class BoardAddressInput {
  @Field(() => String)
  address: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}
