import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchDistricts {
  @Field(() => String)
  name: string;

  @Field(() => [String])
  district: string[];
}
