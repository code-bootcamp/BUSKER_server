import { UpdateBoardImageInput } from './dto/updateBoardImage.input';
import { Boards } from 'src/apis/boards/entites/boards.entity';
import { BoardImages } from 'src/apis/boardImages/entity/boardImages.entity';
import { Injectable } from '@nestjs/common';
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

  async create({ url }) {
    const result = await this.boardImagesRepository.save({ url: url });
    return result;
  }

  async update({
    updateBoardImageInput,
  }: {
    updateBoardImageInput: UpdateBoardImageInput;
  }) {
    const { boardId, ...imageList } = updateBoardImageInput;
    const dbImageList = await this.boardImagesRepository.find({
      where: { boards: { id: boardId } },
    });

    const dbImageList2 = dbImageList.map((el) => el.url);

    await Promise.all(
      dbImageList2.map((el) => {
        if (!imageList.url.includes(el)) {
          return this.boardImagesRepository.softDelete({
            boards: { id: boardId },
            url: el,
          });
        }
        return;
      }),
    );
    await Promise.all(
      imageList.url.map(async (el) => {
        const checker = await this.boardImagesRepository.find({
          where: { boards: { id: boardId }, url: el },
        });
        if (!checker.length) {
          return this.boardImagesRepository.save({
            boards: { id: boardId },
            url: el,
          });
        }
        return;
      }),
    );
    return await this.boardImagesRepository.find({
      where: { boards: { id: boardId } },
      relations: ['board'],
    });
  }

  async delete({ boardImagesId }: { boardImagesId: string }) {
    const result = await this.boardImagesRepository.softDelete({
      id: boardImagesId,
    });
    return result.affected ? true : false;
  }
}
