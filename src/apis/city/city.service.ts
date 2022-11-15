import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entity/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}
  locations = ['서울', '부산', '대구', '인천', '대전', '울산', '경기'];

  async create() {
    for (let i = 0; i < this.locations.length; i++) {
      await this.cityRepository.save({
        name: this.locations[i],
      });
    }
    return '저장 완료';
  }

  async findAll() {
    return await this.cityRepository.find({
      relations: ['district'],
    });
  }

  async findOne({ name }) {
    const result = await this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.district', 'district')
      .where('city.name = :name', { name })
      .orderBy('city.name', 'DESC')
      .getOne();
    const array = [];
    result.district.map((el) => {
      array.push(el.district);
    });
    result.district = array;
    return result;
  }
}
