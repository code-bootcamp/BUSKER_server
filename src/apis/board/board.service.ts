import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entites/board.entity';

@Injectable()
export class BoardService {
  // constructor(
  //   @InjectRepository(Board)
  //   private readonly boardRepository: Repository<Board>,
  // ) {}
  getHello() {
    return 'Hello!';
  }
}
