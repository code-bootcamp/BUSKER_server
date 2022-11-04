import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/categories.entity';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { Boards } from './entites/boards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boards, Category])],
  providers: [
    BoardsService, //
    BoardsResolver,
  ],
})
export class BoardsModule {}
