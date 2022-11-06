import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boards } from '../boards/entites/boards.entity';
import { User } from '../users/entity/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Boards)
    private readonly boardsRepository: Repository<Boards>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
}
