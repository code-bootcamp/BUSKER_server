import { Injectable } from '@nestjs/common';
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

  async create({ createCommentInput }) {
    const { userId, boardId } = createCommentInput;

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const board = await this.boardsRepository.findOne({
      where: { id: boardId },
    });

    const result = await this.commentRepository.save({
      ...createCommentInput,
      user: user,
      board: board,
    });

    console.log(result);
    return result;
  }

  async findAll() {
    return await this.commentRepository.find();
  }
}
