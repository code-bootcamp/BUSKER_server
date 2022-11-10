import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [MembersResolver, MembersService],
})
export class MembersModule {}
