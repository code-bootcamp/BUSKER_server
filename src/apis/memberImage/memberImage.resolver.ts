import { CreateMemberImageInput } from './dto/createMemberImage.input';
import { MemberImage } from './entity/memberImage.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MemberImageService } from './memberImage.service';
import { UpdateMemberImageInput } from './dto/updateMemberImage.input';

@Resolver()
export class MemberImageResolver {
  constructor(
    private readonly memberImageService: MemberImageService, //
  ) {}

  @Mutation(() => MemberImage)
  async createMemberImage(
    @Args({ name: 'url', type: () => String }) url: string,
  ) {
    return this.memberImageService.create({ url });
  }

  @Mutation(() => MemberImage)
  async updateMemberImage(
    @Args('updateMemberImageInput')
    updateMemberImageInput: UpdateMemberImageInput,
  ) {
    return await this.memberImageService.update({ updateMemberImageInput });
  }

  @Mutation(() => Boolean)
  async deleteMemberImage(
    @Args('memberImageId') memberImageId: string, //
  ) {
    return await this.memberImageService.delete({ memberImageId });
  }
}
