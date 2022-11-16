import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { UsersService } from 'src/apis/users/users.service';
import { UserImageResolver } from './userImage.resolver';
import { User } from 'src/apis/users/entity/user.entity';
import { UserImage } from './entity/userImage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './../files/files.service';
import { UserImageService } from './userImage.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserImage, User, UserAuthority])],
  providers: [UserImageResolver, UserImageService, FilesService, UsersService],
})
export class UserImageModule {}
