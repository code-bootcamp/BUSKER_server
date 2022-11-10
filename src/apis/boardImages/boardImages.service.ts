import { Boards } from 'src/apis/boards/entites/boards.entity';
import { BoardImages } from 'src/apis/boardImages/entity/boardImages.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardImagesService {
  constructor(
    @InjectRepository(BoardImages)
    private readonly boardImagesRepository: Repository<BoardImages>, //

    @InjectRepository(Boards)
    private readonly BoardsRepository: Repository<Boards>,
  ) {}

  async create({ boardId, urls }) {
    const board = await this.BoardsRepository.findOne({
      where: { id: boardId },
    });
    if (!board)
      throw new UnprocessableEntityException('등록되지 않은 boardId 입니다.');
    const result = await Promise.all(
      urls.map((el) => {
        return this.boardImagesRepository.save({ url: el, board });
      }),
    );
    return result;
  }
}
