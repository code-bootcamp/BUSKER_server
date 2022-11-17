import { UserImage } from './../userImage/entity/userImage.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GqlAuthAccessGuard } from 'src/commons/gql-auth.guard';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { RoleService } from 'src/commons/role/role.service';
import { User } from './entity/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAuthority, UserImage])],
  providers: [UsersResolver, UsersService, RoleService, GqlAuthAccessGuard],
})
export class UsersModule {}
