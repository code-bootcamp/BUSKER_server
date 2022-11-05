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

  async create({ createBoardInput }) {
    const { category, ...boards } = createBoardInput;

    const boardCategory = await this.categoryRepository.findOne({
      where: {
        name: category,
      },
    });

    const result = await this.boardRepository.save({
      ...boards,
      category: boardCategory,
    });
    return result;
  }

  async findAll() {
    const result = await this.boardRepository.find({
      relations: ['category'],
    });
    console.log(result);
    return result;
  }
}
