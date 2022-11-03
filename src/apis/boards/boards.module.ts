import { Module } from '@nestjs/common';
import { BoardsResolver } from './board.resolver';
import { BoardsService } from './boards.service';

@Module({
  providers: [
    BoardsService, //
    BoardsResolver,
  ],
})
export class BoardsModule {}
