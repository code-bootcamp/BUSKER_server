import { Member } from 'src/apis/members/entity/member.entity';
import { MemberImage } from './../memberImage/entity/memberImage.entity';
import { Artist } from 'src/apis/artists/entity/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, MemberImage, Member])],
  providers: [MembersResolver, MembersService],
})
export class MembersModule {}
