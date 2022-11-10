import { Boards } from 'src/apis/boards/entites/boards.entity';
import { BoardImages } from 'src/apis/boardImages/entity/boardImages.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardImages, Boards])],
  providers: [
    FilesResolver, //
    FilesService,
  ],
})
export class FilesModule {}
