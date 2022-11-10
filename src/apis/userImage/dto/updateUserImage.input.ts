import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserImageInput } from './createUserImage.input';

@InputType()
export class UpdateUserImageInput extends PartialType(CreateUserImageInput) {}
