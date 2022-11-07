import { CreateMemberInput } from './createMemberInput';
import { PartialType, InputType } from '@nestjs/graphql';

export class UpdateMemberInput extends PartialType(
  CreateMemberInput,
  InputType,
) {}
