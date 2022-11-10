import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMemberImageInput } from './createMemberImage.input';

@InputType()
export class UpdateMemberImageInput extends PartialType(
  CreateMemberImageInput,
) {}
