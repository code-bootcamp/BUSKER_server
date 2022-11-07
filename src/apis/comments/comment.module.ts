import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from '../boards/entites/boards.entity';
import { User } from '../users/entity/user.entity';
import { CommentsResolver } from './comment.resolver';
import { CommentsService } from './comment.service';
import { Comments } from './entity/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Boards, User])],
  providers: [CommentsResolver, CommentsService],
})
export class CommentModule {}
