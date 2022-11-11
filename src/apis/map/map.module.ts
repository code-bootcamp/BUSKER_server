import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardAddress } from '../boardAddress/entity/boardAddress.entity';
import { Boards } from '../boards/entites/boards.entity';
import { MapResolver } from './map.resolver';
import { MapService } from './map.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardAddress, Boards])],
  providers: [MapService, MapResolver],
})
export class MapModule {}
