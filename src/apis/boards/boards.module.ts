import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { Artist } from '../artists/entity/artist.entity';
import { BoardAddress } from '../boardAddress/entity/boardAddress.entity';
import { BoardImages } from '../boardImages/entity/boardImages.entity';
import { Category } from '../categories/entities/categories.entity';
import { Comments } from '../comments/entity/comments.entity';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { Boards } from './entites/boards.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Boards,
      Category,
      Artist,
      BoardAddress,
      BoardImages,
      UserAuthority,
      Comments,
    ]),
  ],

  providers: [
    BoardsService, //
    BoardsResolver,
  ],
})
export class BoardsModule {}
