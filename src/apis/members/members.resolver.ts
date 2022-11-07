import { NotFoundException } from '@nestjs/common';
import { UpdateMemberInput } from './dto/updateMemberInput';
import { CreateMemberInput } from './dto/createMemberInput';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Member } from './entity/member.entity';
import { MembersService } from './members.service';

@Resolver()
export class MembersResolver {
  constructor(
    private readonly membersService: MembersService, //
  ) {}

  // 멤버 등록
  @Mutation(() => Member)
  async createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput, //
  ) {
    return await this.membersService.create({ ...createMemberInput });
  }

  // 멤버 수정
  @Mutation(() => Boolean)
  async updateMember(
    @Args('memberId') memberId: string, //
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput, //
  ) {
    const result = await this.membersService.findOne({ memberId });
    if (!result) throw new NotFoundException('not found member');
    return await this.membersService.update({
      memberId,
      ...updateMemberInput,
    });
  }

  // 멤버 삭제
  @Mutation(() => Boolean)
  async deleteMember(@Args('memberId') memberId: string) {
    const result = await this.membersService.findOne({ memberId });
    if (!result) throw new NotFoundException('not found member');
    return await this.membersService.delete({ memberId });
  }
}
