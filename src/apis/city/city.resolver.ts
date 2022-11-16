import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CityService } from './city.service';
import { FetchDistricts } from './dto/city.out';
import { City } from './entity/city.entity';

@Resolver()
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Mutation(() => String)
  async createCity() {
    return await this.cityService.create();
  }

  @Query(() => [City])
  async fetchCitys() {
    return await this.cityService.findAll();
  }

  @Query(() => FetchDistricts)
  async fetchCity(@Args('name') name: string) {
    return await this.cityService.findOne({ name });
  }
}
