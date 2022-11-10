import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardAddress } from '../boardAddress/entity/boardAddress.entity';
import { Boards } from '../boards/entites/boards.entity';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(BoardAddress)
    private readonly boardAddressRepository: Repository<BoardAddress>,
    @InjectRepository(Boards)
    private readonly boardsRepository: Repository<Boards>,
  ) {}

  async finds({ lat, lng, distance }) {
    // 주어진 범위 내에 게시글 종료일이 지나지 않은 게시글을 찾는다.
    return await this.boardsRepository
      .createQueryBuilder('boards')
      .leftJoinAndSelect('boards.boardAddress', 'boardAddress')
      .where('boards.end_time > now()')
      .andWhere(
        'boardAddress.lat BETWEEN :lat - :distance AND :lat + :distance',
        {
          lat,
          distance,
        },
      )
      .andWhere(
        'boardAddress.lng BETWEEN :lng - :distance AND :lng + :distance',
        {
          lng,
          distance,
        },
      )
      .getMany();
  }
}
