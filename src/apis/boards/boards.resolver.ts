import { Args, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Boards } from './entites/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardService: BoardsService) {}

  @Query(() => String)
  boardGetHello() {
    return this.boardService.getHello();
  }
}
