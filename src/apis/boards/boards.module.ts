import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artists/entity/artist.entity';
import { Category } from '../categories/entities/categories.entity';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { Boards } from './entites/boards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boards, Category, Artist])],

  providers: [
    BoardsService, //
    BoardsResolver,
  ],
})
export class BoardsModule {}
