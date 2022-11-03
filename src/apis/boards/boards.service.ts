import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boards } from './entites/boards.entity';

@Injectable()
export class BoardsService {
  // constructor(
  //   @InjectRepository(Board)
  //   private readonly boardRepository: Repository<Board>,
  // ) {}
  getHello() {
    console.log('@');
    return 'Hello!';
  }
}
