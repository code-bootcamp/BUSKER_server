import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entity/user.entity';
import { UsersService } from 'src/apis/users/users.service';
import { JwtRefreshStrategy } from 'src/commons/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/jwt-social-google';
import { AuthService } from './\bauth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    AuthResolver,
    AuthService,
    UsersService, //
  ],
  controllers: [AuthController],
})
export class AuthModule {}
