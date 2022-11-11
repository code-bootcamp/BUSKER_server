import { UserImageResolver } from './userImage.resolver';
import { User } from 'src/apis/users/entity/user.entity';
import { UserImage } from './entity/userImage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './../files/files.service';
import { UserImageService } from './userImage.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserImage, User])],
  providers: [UserImageResolver, UserImageService, FilesService],
})
export class UserImageModule {}
