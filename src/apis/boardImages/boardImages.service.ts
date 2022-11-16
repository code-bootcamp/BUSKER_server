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

  // async update({ boardId, urls }) {
  //   const boards = await this.BoardsRepository.findOne({
  //     where: { id: boardId },
  //   });
  //   if (!boards)
  //     throw new UnprocessableEntityException('등록되지 않은 boardId 입니다.');

  //   const boardUrls = await this.boardImagesRepository.find({
  //     where: { id: boardId },
  //   });

  //   const newUrlsArray = [];
  //   const pastUrls = [];

  //   for (let i = 0; i < urls.length; i++) {
  //     await Promise.all(
  //       boardUrls.map(async (el) => {
  //         if (el.url === urls[i]) {
  //           newUrlsArray.push(el.url);
  //         } else {
  //           pastUrls.push(el.url);
  //         }
  //       }),
  //     );
  //   }

  //   const newUrls = urls.filter((el) => {
  //     return !newUrlsArray.includes(el);
  //   });

  //   const forDelete = [
  //     ...new Set(
  //       pastUrls.filter((el) => {
  //         return !newUrlsArray.includes(el);
  //       }),
  //     ),
  //   ];

  //   await Promise.all(
  //     newUrls.map(async (el) => {
  //       return await this.boardImagesRepository.save({
  //         boards,
  //         url: el,
  //       });
  //     }),
  //   );

  //   await Promise.all(
  //     forDelete.map(async (el) => {
  //       return await this.boardImagesRepository.softDelete({
  //         boards,
  //         url: el,
  //       });
  //     }),
  //   );
  //   const saveResult = await this.boardImagesRepository.find({
  //     where: { boards },
  //     relations: ['boards'],
  //   });
  //   return saveResult;
  // }

  async delete({ boardImagesId }) {
    const result = await this.boardImagesRepository.softDelete({
      id: boardImagesId,
    });
    return result.affected ? true : false;
  }
}
