import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength, Validate } from 'class-validator';
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
export class CreateUserInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  readonly password: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'https://i.ibb.co/PYBhzR8/noprofile.jpg',
  })
  userImageURL: string;
}
