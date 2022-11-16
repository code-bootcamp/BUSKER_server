import { UpdateMemberImageInput } from './dto/updateMemberImage.input';
import { CreateMemberImageInput } from './dto/createMemberImage.input';
import { Member } from 'src/apis/members/entity/member.entity';
import { MemberImage } from './entity/memberImage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemberImageService {
  constructor(
    @InjectRepository(MemberImage)
    private readonly memberImageRepository: Repository<MemberImage>,
  ) {}

  async create({ url }) {
    const result = await this.memberImageRepository.save({
      url: url,
    });
    return result;
  }

  async update({
    updateMemberImageInput,
  }: {
    updateMemberImageInput: UpdateMemberImageInput;
  }) {
    const { memberId, ...memberImage } = updateMemberImageInput;

    // 기존 멤버 이미지 가져오기
    const memberImageData = await this.memberImageRepository.findOne({
      where: { member: { id: memberId } },
    });
    // 기존 이미지가 있으면
    if (memberImageData) {
      // 기존 이미지 삭제하기
      this.memberImageRepository.softDelete({
        member: { id: memberId },
      });
      // 새로운 이미지 저장하기
      const result: MemberImage = await this.memberImageRepository.save({
        ...memberImage,
        member: { id: memberId },
        relations: ['member'],
      });
      return result;
    }
  }

  async delete({ memberImageId }: { memberImageId: string }) {
    const result = await this.memberImageRepository.softDelete({
      id: memberImageId,
    });
    return result.affected ? true : false;
  }
}
