import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBoardImageInput } from './createBoardImage.input';

@InputType()
export class UpdateBoardImageInput extends PartialType(CreateBoardImageInput) {}
