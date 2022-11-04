import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/categories.entity';

import { Boards } from './entites/boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private readonly boardRepository: Repository<Boards>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  getHello() {
    return 'Hello!';
  }

  // async create({ createBoardInput }) {
  //   const { ...boards } = createBoardInput;

  //   const result = await this.boardRepository.save({
  //     boards,
  //     ...createBoardInput,
  //   });

  //   return result;
  // }
}
