import { MemberImage } from './entity/memberImage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { MemberImageResolver } from './memberImage.resolver';
import { MemberImageService } from './memberImage.service';
import { Member } from '../members/entity/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberImage, Member])],
  providers: [MemberImageResolver, MemberImageService, FilesService],
})
export class MemberImageModule {}
