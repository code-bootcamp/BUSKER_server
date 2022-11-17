import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/gql-auth.guard';
import { Roles } from 'src/commons/role/roles.decorator';
import { RolesGuard } from 'src/commons/role/roles.guard';
import { RoleType } from 'src/commons/role/type/role-type';

import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { SearchBoardInput } from './dto/searchBoard.inpust';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Boards } from './entites/boards.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [Boards])
  async fetchBoardsBySearch(
    @Args({ name: 'searchBoardInput', nullable: true })
    searchBoardInput: SearchBoardInput,
  ) {
    const result = await this.boardsService.findSearch({
      searchBoardInput,
    });
    return result;
  }

  @Query(() => [Boards])
  async fetchBoards() {
    return await this.boardsService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Boards)
  async fetchBoard(
    @Args('boardId') boardId: string, //
  ) {
    return await this.boardsService.findOne({ boardId });
  }

  // @Query(() => [Boards])
  // async fetchBoardByCategory(@Args('category') category: string) {
  //   const result = await this.boardsService.findCategory({ category });
  //   return result;
  // }
  // @Query(() => [Boards])
  // async fetchBoardByAddress_city(@Args('city') city: string) {
  //   const result = await this.boardsService.findCity({ city });
  //   return result;
  // }

  // @Query(() => [Boards])
  // async fetchBoardByAddress_district(@Args('district') district: string) {
  //   const result = await this.boardsService.findDistrict({ district });

  //   return result;
  // }

  @Query(() => [Boards])
  async fetchRecentBoards(@Args('artistId') artistId: string) {
    return await this.boardsService.findRecent({ artistId });
  }

  @Mutation(() => Boolean)
  deleteBoard(@Args('boardId') boardId: string) {
    return this.boardsService.delete({ boardId });
  }

  @Roles(RoleType.ARTIST)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boards)
  async createBoards(
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput,
    @Context() context: any,
  ) {
    const result = await this.boardsService.create({
      context,
      createBoardInput,
    });
    return result;
  }

  @Roles(RoleType.ARTIST)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boards)
  async updateBoard(
    @Args('boardId') boardId: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    @Context() context: any,
  ) {
    return await this.boardsService.update({
      context,
      boardId,
      updateBoardInput,
    });
  }
}
