import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../city/entity/city.entity';
import { DistrictResolver } from './district.resolver';
import { DistrictService } from './district.service';
import { District } from './entity/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([District, City])],
  providers: [DistrictResolver, DistrictService],
})
export class DistrictModule {}
