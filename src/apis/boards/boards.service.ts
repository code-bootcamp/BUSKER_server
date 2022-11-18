import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { In, Repository } from 'typeorm';
import { Artist } from '../artists/entity/artist.entity';
import { BoardAddress } from '../boardAddress/entity/boardAddress.entity';
import { BoardImages } from '../boardImages/entity/boardImages.entity';
import { Category } from '../categories/entities/categories.entity';
import { Comments } from '../comments/entity/comments.entity';

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
    @InjectRepository(UserAuthority)
    private readonly userAuthorityRepository: Repository<UserAuthority>,
    @InjectRepository(BoardImages)
    private readonly boardImageRepository: Repository<BoardImages>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  paging({ value, page }) {
    const arr = [];
    for (let i = 0; i < value.length; i++) {
      const temp = [];
      for (let j = 0; j < 12; j++) {
        temp.push(value.shift());
        if (value.length === 0) break;
      }
      arr.push(temp);
    }
    return arr[page - 1];
  }

  async create({ context, createBoardInput }) {
    const { category, boardImageURL, boardAddressInput, ...boards } =
      createBoardInput;

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

    if (!boardCategory)
      throw new UnprocessableEntityException(
        '잘못된 카테고리 혹은 카테고리가 없습니다.',
      );

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

    const temp = [];
    if (createBoardInput.boardImageURL) {
      for (let i = 0; i < boardImageURL.length; i++) {
        const image = await this.boardImageRepository.save({
          url: boardImageURL[i],
          boards: result,
        });
        temp.push(image);
      }
    }
    result.boardImageURL = temp;

    return result;
  }

  async findAll() {
    return await this.boardRepository.find({
      relations: ['category', 'artist', 'boardAddress', 'boardImageURL'],
    });
  }

  async findSearch({ searchBoardInput }) {
    if (!searchBoardInput) {
      const value = await this.boardRepository.find({
        relations: ['category', 'artist', 'boardAddress', 'boardImageURL'],
      });

      const now = new Date();
      for (let i = 0; i < value.length; i++) {
        if (value[i].start_time < now && value[i].end_time > now) {
          await this.boardRepository.save({
            ...value[i],
            id: value[i].id,
            isShowTime: true,
          });
        } else {
          await this.boardRepository.save({
            ...value[i],
            id: value[i].id,
            isShowTime: false,
          });
        }
      }
      const page = 1;
      const result = this.paging({ value, page });
      if (!result) return [];
      return result;
    }
    const { page, category, district } = searchBoardInput;
    if (category && district) {
      const value = await this.boardRepository.find({
        where: {
          category: {
            id: In(category),
          },
          boardAddress: {
            address_district: district,
          },
        },
        relations: ['category', 'artist', 'boardAddress', 'boardImageURL'],
      });

      const now = new Date();
      for (let i = 0; i < value.length; i++) {
        if (value[i].start_time < now && value[i].end_time > now) {
          await this.boardRepository.save({
            ...value[i],
            id: value[i].id,
            isShowTime: true,
          });
        } else {
          await this.boardRepository.save({
            ...value[i],
            id: value[i].id,
            isShowTime: false,
          });
        }
      }

      const result = this.paging({ value, page });
      if (!result) return [];
      return result;
    }

    if (!category) {
      const value = await this.boardRepository.find({
        where: {
          boardAddress: {
            address_district: district,
          },
        },
        relations: ['category', 'artist', 'boardAddress', 'boardImageURL'],
      });

      const now = new Date();
      for (let i = 0; i < value.length; i++) {
        if (value[i].start_time < now && value[i].end_time > now) {
          await this.boardRepository.save({
            ...value[i],
            id: value[i].id,
            isShowTime: true,
          });
        } else {
          await this.boardRepository.save({
            ...value[i],
            id: value[i].id,
            isShowTime: false,
          });
        }
      }
      const result = this.paging({ value, page });
      if (!result) return [];
      return result;
    }

    if (!district) {
      const value = await this.boardRepository.find({
        where: {
          category: {
            id: In(category),
          },
        },
        relations: ['category', 'artist', 'boardAddress', 'boardImageURL'],
      });

      const now = new Date();
      for (let i = 0; i < value.length; i++) {
        if (value[i].start_time < now && value[i].end_time > now) {
          await this.boardRepository.save({
            ...value[i],
            id: value[i].id,
            isShowTime: true,
          });
        } else {
          await this.boardRepository.save({
            ...value[i],
            id: value[i].id,
            isShowTime: false,
          });
        }
      }
      const result = this.paging({ value, page });
      if (!result) return [];
      return result;
    }

    if (!category && !district) {
      const value = await this.boardRepository.find();

      const result = this.paging({ value, page });
      if (!result) return [];
      return result;
    }
  }

  async findRecent({ artistId }) {
    const recent = await this.boardRepository.find({
      where: {
        artist: {
          id: artistId,
        },
      },
      relations: ['artist', 'boardImageURL'],
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

  // async findCity({ city }) {
  //   const result = await this.boardRepository.find({
  //     where: {
  //       boardAddress: {
  //         address_city: city,
  //       },
  //     },
  //     relations: ['category', 'artist', 'boardAddress', 'boardImages'],
  //   });
  //   return result;
  // }

  // async findDistrict({ district }) {
  //   const result = await this.boardRepository.find({
  //     where: {
  //       boardAddress: {
  //         address_district: district,
  //       },
  //     },
  //     relations: ['category', 'artist', 'boardAddress', 'boardImages'],
  //   });
  //   return result;
  // }

  // async findCategory({ category }) {
  //   const result = await this.boardRepository.find({
  //     where: {
  //       category: {
  //         name: In(category),
  //       },
  //     },
  //     relations: ['category', 'artist', 'boardAddress', 'boardImages'],
  //   });

  //   if (result.length === 0) {
  //     throw new UnprocessableEntityException('조회된 내역이없습니다.');
  //   }
  //   return result;
  // }

  async findOne({ boardId }) {
    const result = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
      relations: [
        'category',
        'artist',
        'boardAddress',
        'comments',
        'boardImageURL',
      ],
    });

    if (!result) {
      throw new UnprocessableEntityException('잘못된 조회입니다.');
    }

    return result;
  }

  async delete({ boardId }) {
    await this.boardImageRepository.delete({
      boards: {
        id: boardId,
      },
    });

    await this.commentRepository.delete({
      board: {
        id: boardId,
      },
    });

    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
      relations: ['boardAddress'],
    });

    const result = await this.boardRepository.delete({ id: boardId });

    await this.boardAddressRepository.delete({
      id: board.boardAddress.id,
    });

    return result.affected ? true : false;
  }

  async update({ context, boardId, updateBoardInput }) {
    const myBoard = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['category', 'artist', 'boardAddress', 'boardImageURL'],
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

    // 기존 이미지 삭제
    const boardImages = myBoard.boardImageURL;
    for (let i = 0; i < boardImages.length; i++) {
      const boardImageId = boardImages[i].id;
      this.boardImageRepository.delete({
        id: boardImageId,
      });
    }

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

      if (updateBoardInput.boardImageURL) {
        const temp = [];
        const newBoardImg = result.boardImageURL;
        for (let i = 0; i < newBoardImg.length; i++) {
          const url = newBoardImg[i];
          const image = await this.boardImageRepository.save({
            url,
            boards: result,
          });
          temp.push(image);
        }
        result.boardImageURL = temp;
      }

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

      if (updateBoardInput.boardImageURL) {
        const temp = [];
        const newBoardImg = result.boardImageURL;
        for (let i = 0; i < newBoardImg.length; i++) {
          const url = newBoardImg[i];
          const image = await this.boardImageRepository.save({
            url,
            boards: result,
          });
          temp.push(image);
        }
        result.boardImageURL = temp;
      }

      return result;
    }
  }
}
