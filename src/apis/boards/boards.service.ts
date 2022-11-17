import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistsService } from '../artists/artists.service';
import { Artist } from '../artists/entity/artist.entity';
import { BoardAddress } from '../boardAddress/entity/boardAddress.entity';
import { CategoryService } from '../categories/categories.service';
import { Boards } from './entites/boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private readonly boardsRepository: Repository<Boards>,
    @InjectRepository(BoardAddress)
    private readonly boardAddressRepository: Repository<BoardAddress>,
    private readonly artistService: ArtistsService,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll() {
    return await this.boardsRepository.find({
      relations: ['category', 'artist', 'boardAddress', 'comments'],
    });
  }

  async findOne({ boardId }) {
    return await this.boardsRepository.findOne({
      where: { id: boardId },
      relations: ['category', 'artist', 'boardAddress', 'comments'],
    });
  }

  async create({ artistId, ...createBoardInput }) {
    const artist = await this.artistService.findOne({ artistId });
    const { categoryId, boardAddressInput, ...rest } = createBoardInput;

    const category = await this.categoryService.findOne({ categoryId });
    const boardAddress = await this.boardAddressRepository.save({
      ...boardAddressInput,
    });

    return await this.boardsRepository.save({
      ...rest,
      artist,
      category,
      boardAddress,
    });
  }
}
