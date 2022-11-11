import { CreateMemberInput } from './createMemberInput';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberInput extends PartialType(
  CreateMemberInput,
  InputType,
) {}
