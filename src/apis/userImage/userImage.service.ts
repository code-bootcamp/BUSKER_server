import { UserImage } from './entity/userImage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserImageInput } from './dto/createUserImage.input';
import { UpdateUserImageInput } from './dto/updateUserImage.input';

@Injectable()
export class UserImageService {
  constructor(
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,
  ) {}

  // Create User Image
  // @param createUserImageInput 이미지를 등록할 유저의 ID와 url
  // @returns `UserImage`
  async create({
    createUserImageInput,
  }: {
    createUserImageInput: CreateUserImageInput;
  }) {
    const { userId, ...userImage } = createUserImageInput;
    const result: UserImage = await this.userImageRepository.save({
      ...userImage,
      user: { id: userId },
      relations: ['user'],
    });
    return result;
  }

  // Update User Image
  // @param updateUserImageInput 이미지를 수정할 유저의 id와 url
  // @returns `userImage`
  async update({
    updateUserImageInput,
  }: {
    updateUserImageInput: UpdateUserImageInput;
  }) {
    const { userId, ...userImage } = updateUserImageInput;

    // 기존 User Image 가져오기
    const userImageDate = await this.userImageRepository.findOne({
      where: { user: { id: userId } },
    });

    if (userImageDate) {
      // 기존 이미지 삭제하기
      this.userImageRepository.softDelete({
        user: { id: userId },
      });
      // 새로운 이미지 저장하기
      const result: UserImage = await this.userImageRepository.save({
        ...userImage,
        user: { id: userId },
        relations: ['user'],
      });
      return result;
    }
  }
}
