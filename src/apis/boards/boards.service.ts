import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { Repository } from 'typeorm';
import { Artist } from '../artists/entity/artist.entity';
import { BoardAddress } from '../boardAddress/entity/boardAddress.entity';
import { BoardImages } from '../boardImages/entity/boardImages.entity';
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
    @InjectRepository(BoardImages)
    private readonly boardImagesRepository: Repository<BoardImages>,
    @InjectRepository(UserAuthority)
    private readonly userAuthorityRepository: Repository<UserAuthority>,
  ) {}

  async create({ context, createBoardInput }) {
    const { category, boardAddressInput, ...boards } = createBoardInput;

    const userId = context.req.user.id;

    const auth = await this.userAuthorityRepository.findOne({
      where: {
        userId: userId,
      },
      relations: ['artist'],
    });

    const boardCategory = await this.categoryRepository.findOne({
      where: {
        id: category,
      },
    });

    const start = new Date(createBoardInput.start_time);
    const end = new Date(createBoardInput.end_time);

    const city = boardAddressInput.address.split(' ')[0];
    const district = `${boardAddressInput.address.split(' ')[0]} ${
      boardAddressInput.address.split(' ')[1]
    }`;

    const boardAddress = await this.boardAddressRepository.save({
      address_city: city,
      address_district: district,
      ...boardAddressInput,
    });

    const result = await this.boardRepository.save({
      title: auth.artist.active_name,
      ...boards,
      category: boardCategory,
      artist: auth.artist,
      boardAddress: boardAddress,
      start_time: start,
      end_time: end,
    });

    return result;
  }

  async findAll() {
    const result = await this.boardRepository.find({
      relations: ['category', 'artist', 'boardAddress', 'boardImages'],
    });
    console.log(result);
    return result;
  }

  async findRecent({ artistId }) {
    const recent = await this.boardRepository.find({
      where: {
        artist: {
          id: artistId,
        },
      },
      relations: ['artist', 'boardImages'],
    });

    recent.sort(function (a, b) {
      return b.end_time < a.end_time ? -1 : b.end_time > a.end_time ? 1 : 0;
    });

    const temp = [];
    for (let i = 0; i < 3; i++) {
      temp.push(recent[i]);
      if (!recent[i]) break;
    }
    return temp;
  }

  async findCity({ city }) {
    const result = await this.boardRepository.find({
      where: {
        boardAddress: {
          address_city: city,
        },
      },
      relations: ['category', 'artist', 'boardAddress', 'boardImages'],
    });
    return result;
  }

  async findDistrict({ district }) {
    const result = await this.boardRepository.find({
      where: {
        boardAddress: {
          address_district: district,
        },
      },
      relations: ['category', 'artist', 'boardAddress', 'boardImages'],
    });
    return result;
  }

  async findCategory({ category }) {
    const result = await this.boardRepository.find({
      where: {
        category: {
          name: category,
        },
      },
      relations: ['category', 'artist', 'boardAddress', 'boardImages'],
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
      relations: [
        'category',
        'artist',
        'boardAddress',
        'boardImages',
        'comments',
      ],
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

  async update({ context, boardId, updateBoardInput }) {
    const myBoard = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['category', 'artist', 'boardAddress', 'boardImages'],
    });

    if (!myBoard) {
      throw new UnprocessableEntityException('존재하지않는 게시물입니다.');
    }

    const start = new Date(updateBoardInput.start_time);
    const end = new Date(updateBoardInput.end_time);

    const myCategory = await this.categoryRepository.findOne({
      where: {
        id: updateBoardInput.category,
      },
    });

    const userId = context.req.user.id;

    const auth = await this.userAuthorityRepository.findOne({
      where: {
        userId,
      },
      relations: ['artist'],
    });

    if (auth.artistId !== myBoard.artist.id) {
      throw new UnprocessableEntityException(
        '다른 아티스트의 글은 수정할수없습니다.',
      );
    }
    if (updateBoardInput.boardAddressInput) {
      const city = updateBoardInput.boardAddressInput.address.split(' ')[0];

      const district = `${
        updateBoardInput.boardAddressInput.address.split(' ')[0]
      } ${updateBoardInput.boardAddressInput.address.split(' ')[1]}`;

      const boardAddress = await this.boardAddressRepository.save({
        id: myBoard.boardAddress.id,
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
        boardAddress: myBoard.boardAddress,
        category: myCategory,
        start_time: start,
        end_time: end,
      });

      return result;
    }
  }
}
