import { Args, Query, Resolver } from '@nestjs/graphql';
import { Boards } from '../boards/entites/boards.entity';
import { MapService } from './map.service';

@Resolver()
export class MapResolver {
  constructor(private readonly mapService: MapService) {}

  @Query(() => [Boards])
  async fetchMapBoards(
    @Args('lat') lat: number,
    @Args('lng') lng: number,
    @Args('distance') distance: number,
  ) {
    return await this.mapService.finds({ lat, lng, distance });
  }
}
