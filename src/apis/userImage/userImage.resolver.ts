import { UserImage } from './entity/userImage.entity';
import { UserImageService } from './userImage.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateUserImageInput } from './dto/createUserImage.input';
import { UpdateUserImageInput } from './dto/updateUserImage.input';

@Resolver()
export class UserImageResolver {
  constructor(
    private readonly userImageService: UserImageService, //
  ) {}

  // Create User Image API
  // @type ['Mutation']
  // @param createUserImageInput 이미지를 등록할 유저의 ID와 url
  // @returns 유저에 등록된 이미지의 정보
  @Mutation(() => UserImage)
  async createUserImage(
    @Args('createUserImageInput')
    createUserImageInput: CreateUserImageInput,
  ) {
    return this.userImageService.create({ createUserImageInput });
  }

  // Update User Image API
  // @type ['Mutation']
  // @param updateUserImageInput 이미지를 등록할 유저의 ID와 url
  // @returns 수정한 유저의 정보
  @Mutation(() => UserImage)
  async updateUserImage(
    @Args('updateUserImageInput')
    updateUserImageInput: UpdateUserImageInput,
  ) {
    return await this.userImageService.update({ updateUserImageInput });
  }
}
