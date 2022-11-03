import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersModule, UsersService],
})
export class UsersModule {}
