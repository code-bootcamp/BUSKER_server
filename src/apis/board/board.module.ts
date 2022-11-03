import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';

@Module({
  providers: [
    BoardService, //
    BoardResolver,
  ],
})
export class BoardModule {}
