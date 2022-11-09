import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, Validate } from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check';

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};
@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  readonly password: string;
}
