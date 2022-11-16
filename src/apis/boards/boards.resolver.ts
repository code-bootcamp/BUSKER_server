import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Boards } from './entites/boards.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}
  @Query(() => [Boards])
  async fetchBoards() {
    return await this.boardsService.findAll();
  }

  @Query(() => Boards)
  async fetchBoard(
    @Args('boardId') boardId: string, //
  ) {
    return await this.boardsService.findOne({ boardId });
  }

  @Mutation(() => Boards)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput, //
    @Args('artistId') artistId: string,
  ) {
    return await this.boardsService.create({ artistId, ...createBoardInput });
  }
}
