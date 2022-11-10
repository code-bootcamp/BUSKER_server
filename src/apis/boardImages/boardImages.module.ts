import { Boards } from 'src/apis/boards/entites/boards.entity';
import { BoardImages } from 'src/apis/boardImages/entity/boardImages.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardImagesResolver } from './boardImages.resolver';
import { BoardImagesService } from './boardImages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardImages, //
      Boards,
    ]),
  ],
  providers: [BoardImagesResolver, BoardImagesService],
})
export class BoardImagesModule {}
