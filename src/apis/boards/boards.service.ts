import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../artists/entity/artist.entity';
import { BoardAddress } from '../boardAddress/entity/boardAddress.entity';
import { Category } from '../categories/entities/categories.entity';

import { Boards } from './entites/boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private readonly boardRepository: Repository<Boards>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(BoardAddress)
    private readonly boardAddressRepository: Repository<BoardAddress>,
  ) {}

  async create({ createBoardInput }) {
    const { category, artist, boardAddressInput, ...boards } = createBoardInput;

    const start = new Date(createBoardInput.start_time);
    const end = new Date(createBoardInput.end_time);

    const boardAddress = await this.boardAddressRepository.save({
      address_city: boardAddressInput.address.split(' ')[0],
      address_district: boardAddressInput.address.split(' ')[1],
      ...boardAddressInput,
    });

    console.log(createBoardInput.start_time.split(' ')[0]);

    const boardCategory = await this.categoryRepository.findOne({
      where: {
        name: category,
      },
    });

    const boardArtist = await this.artistRepository.findOne({
      where: {
        active_name: artist,
      },
    });

    if (!boardArtist) {
      throw new UnprocessableEntityException(
        '아티스트 등록을 해야 게시글 등록을 할수 있습니다.',
      );
    }

    const result = await this.boardRepository.save({
      title: boardArtist.active_name,
      ...boards,
      category: boardCategory,
      artist: boardArtist,
      boardAddress: boardAddress,
      start_time: start,
      end_time: end,
    });
    console.log(result);
    return result;
  }

  async findAll() {
    const result = await this.boardRepository.find({
      relations: ['category', 'artist', 'boardAddress'],
    });
    console.log(result);
    return result;
  }

  async findCategory({ category }) {
    const boardCategory = await this.categoryRepository.findOne({
      where: {
        name: category,
      },
    });

    const result = await this.boardRepository.find({
      where: {
        category: boardCategory,
      },
      relations: ['category', 'artist', 'boardAddress'],
    });

    if (result.length === 0) {
      throw new UnprocessableEntityException('조회된 내역이없습니다.');
    }
    return result;
  }

  async findOne({ boardId }) {
    const result = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
      relations: ['category', 'artist', 'boardAddress'],
    });

    if (!result) {
      throw new UnprocessableEntityException('잘못된 조회입니다.');
    }
    return result;
  }

  async delete({ boardId }) {
    const result = await this.boardRepository.delete({ id: boardId });
    return result.affected ? true : false;
  }

  async update({ boardId, updateBoardInput }) {
    const myBoard = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!myBoard) {
      throw new UnprocessableEntityException('존재하지않는 게시물입니다.');
    }

    const start = new Date(updateBoardInput.start_time);
    const end = new Date(updateBoardInput.end_time);

    const myCategory = await this.categoryRepository.findOne({
      where: {
        name: updateBoardInput.category,
      },
    });

    if (updateBoardInput.boardAddress) {
      const city = updateBoardInput.boardAddressInput.address.split(' ')[0];
      const district = updateBoardInput.boardAddressInput.address.split(' ')[1];

      const boardAddress = await this.boardAddressRepository.save({
        address_city: city,
        address_district: district,
        ...updateBoardInput.boardAddressInput,
      });

      const result = await this.boardRepository.save({
        ...myBoard,
        id: boardId,
        ...updateBoardInput,
        boardAddress: boardAddress,
        category: myCategory,
        start_time: start,
        end_time: end,
      });
      return result;
    } else {
      const result = await this.boardRepository.save({
        ...myBoard,
        id: boardId,
        ...updateBoardInput,
        category: myCategory,
        start_time: start,
        end_time: end,
      });

      return result;
    }
  }
}
