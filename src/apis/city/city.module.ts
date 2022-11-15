import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from '../district/entity/district.entity';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';
import { City } from './entity/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, District])],
  providers: [CityResolver, CityService],
})
export class CityModule {}
