import { UpdateBoardImageInput } from './dto/updateBoardImage.input';
import { CreateBoardImageInput } from './dto/createBoardImage.input';
import { BoardImages } from 'src/apis/boardImages/entity/boardImages.entity';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BoardImagesService } from './boardImages.service';

@Resolver()
export class BoardImagesResolver {
  constructor(private readonly boardImagesService: BoardImagesService) {}

  // Create Board Images API
  // @type [`Mutation`]
  // @param createBoardImageInput 이미지를 등록할 게시물의 ID와 url
  // @returns 게시물에 등록한 이미지의 정보
  @Mutation(() => BoardImages)
  async createBoardImages(
    @Args({ name: 'url', type: () => String }) url: string,
  ) {
    return await this.boardImagesService.create({ url });
  }

  @Mutation(() => [BoardImages])
  async updateBoardImages(
    @Args('updateBoardImageInput') updateBoardImageInput: UpdateBoardImageInput,
  ) {
    return await this.boardImagesService.update({ updateBoardImageInput });
  }

  @Mutation(() => Boolean)
  async deleteBoardImages(
    @Args('boardImagesId') boardImagesId: string, //
  ) {
    return this.boardImagesService.delete({ boardImagesId });
  }
}
