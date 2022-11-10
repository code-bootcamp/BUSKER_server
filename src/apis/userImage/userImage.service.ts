import { UserImage } from './entity/userImage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserImageInput } from './dto/createUserImage.input';

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
}
