import { NotFoundException } from '@nestjs/common';
import { UpdateMemberInput } from './dto/updateMemberInput';
import { CreateMemberInput } from './dto/createMemberInput';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Member } from './entity/member.entity';
import { MembersService } from './members.service';

@Resolver()
export class MembersResolver {
  constructor(
    private readonly membersService: MembersService, //
  ) {}

  @Query(() => [Member])
  fetchMembers(@Args('artistId') artistId: string) {
    return this.membersService.findOne({ artistId });
  }

  // 멤버 등록
  @Mutation(() => Member)
  async createMember(
    @Args('artistId') artistId: string, //
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ) {
    return await this.membersService.create({ artistId, createMemberInput });
  }

  // 멤버 수정
  @Mutation(() => Boolean)
  async updateMember(
    @Args('artistId') artistId: string, //
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput, //
  ) {
    const result = await this.membersService.findOne({ artistId });
    if (!result) throw new NotFoundException('not found member');
    return await this.membersService.update({
      artistId,
      ...updateMemberInput,
    });
  }

  // 멤버 삭제
  @Mutation(() => Boolean)
  async deleteMember(@Args('artistId') artistId: string) {
    const result = await this.membersService.findOne({ artistId });
    if (!result) throw new NotFoundException('not found member');
    return await this.membersService.delete({ artistId });
  }
}
