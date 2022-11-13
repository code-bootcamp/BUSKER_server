import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boards } from '../boards/entites/boards.entity';
import { User } from '../users/entity/user.entity';
import { Comments } from './entity/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    @InjectRepository(Boards)
    private readonly boardsRepository: Repository<Boards>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ context, createCommentInput }) {
    const board = await this.boardsRepository.findOne({
      where: {
        id: createCommentInput.boardId,
      },
    });
    const result = await this.commentRepository.save({
      ...createCommentInput,
      user: context.req.user,
      board,
    });

    return result;
  }

  async findOne({ boardId }) {
    const result = await this.commentRepository.find({
      where: {
        board: {
          id: boardId,
        },
      },
      relations: ['user', 'board'],
    });

    return result;
  }

  async delete({ context, commentId }) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
      relations: ['user'],
    });

    if (comment.user.id !== context.req.user.id) {
      throw new UnprocessableEntityException('내가 쓴 댓글만 삭제 가능합니다.');
    }
    const result = await this.commentRepository.delete({ id: commentId });
    return result.affected ? true : false;
  }

  async update({ context, commentId, content }) {
    const myComment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
      relations: ['user', 'board'],
    });

    if (myComment.user.id !== context.req.user.id) {
      throw new UnprocessableEntityException('내가 쓴 댓글만 수정가능합니다.');
    }
    const result = await this.commentRepository.save({
      ...myComment,
      id: commentId,
      content,
    });

    return result;
  }
}
