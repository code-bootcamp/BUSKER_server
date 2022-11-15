import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { DistrictService } from './district.service';
import { District } from './entity/district.entity';

@Resolver()
export class DistrictResolver {
  constructor(private districtService: DistrictService) {}

  @Query(() => [District])
  async districtList() {
    return await this.districtService.findAll();
  }

  @Mutation(() => String)
  async createDistrictList() {
    return await this.districtService.create();
  }
}
