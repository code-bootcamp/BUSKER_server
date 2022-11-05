import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Boards } from './entites/boards.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [Boards])
  async fetchBoards() {
    const result = await this.boardsService.findAll();
    return result;
  }

  @Query(() => [Boards])
  async fetchBoardByCategory(@Args('category') category: string) {
    const result = await this.boardsService.findCategory({ category });
    return result;
  }

  @Mutation(() => Boards)
  async createBoards(
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput,
  ) {
    const result = await this.boardsService.create({ createBoardInput });
    return result;
  }
}
