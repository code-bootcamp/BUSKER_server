import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entity/user.entity';
import { UsersService } from 'src/apis/users/users.service';
import { JwtRefreshStrategy } from 'src/commons/jwt-refresh.strategy';
import { AuthService } from './\bauth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [
    JwtRefreshStrategy,
    AuthResolver,
    AuthService,
    UsersService, //
  ],
})
export class AuthModule {}
