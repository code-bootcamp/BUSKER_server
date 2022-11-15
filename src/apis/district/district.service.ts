import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../city/entity/city.entity';
import { District } from './entity/district.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}
  locations = [
    '서울 종로구',
    '서울 중구',
    '서울 용산구',
    '서울 성동구',
    '서울 광진구',
    '서울 동대문구',
    '서울 중랑구',
    '서울 성북구',
    '서울 강북구',
    '서울 도봉구',
    '서울 노원구',
    '서울 은평구',
    '서울 서대문구',
    '서울 마포구',
    '서울 양천구',
    '서울 강서구',
    '서울 구로구',
    '서울 금천구',
    '서울 영등포구',
    '서울 동작구',
    '서울 관악구',
    '서울 서초구',
    '서울 강남구',
    '서울 송파구',
    '서울 강동구',
    '부산 중구',
    '부산 서구',
    '부산 동구',
    '부산 영도구',
    '부산 부산진구',
    '부산 동래구',
    '부산 남구',
    '부산 북구',
    '부산 해운대구',
    '부산 사하구',
    '부산 금정구',
    '부산 강서구',
    '부산 연제구',
    '부산 수영구',
    '부산 사상구',
    '부산 기장군',
    '대구 중구',
    '대구 동구',
    '대구 서구',
    '대구 남구',
    '대구 북구',
    '대구 수성구',
    '대구 달서구',
    '대구 달성군',
    '인천 중구',
    '인천 동구',
    '인천 남구',
    '인천 미추홀구',
    '인천 연수구',
    '인천 남동구',
    '인천 부평구',
    '인천 계양구',
    '인천 서구',
    '인천 강화군',
    '인천 옹진군',
    '대전 동구',
    '대전 중구',
    '대전 서구',
    '대전 유성구',
    '대전 대덕구',
    '울산 중구',
    '울산 남구',
    '울산 동구',
    '울산 북구',
    '울산 울주군',
    '경기 수원시',
    '경기 성남시',
    '경기 고양시',
    '경기 용인시',
    '경기 부천시',
    '경기 안산시',
    '경기 안양시',
    '경기 남양주시',
    '경기 화성시',
    '경기 평택시',
    '경기 의정부시',
    '경기 시흥시',
    '경기 파주시',
    '경기 광명시',
    '경기 김포시',
    '경기 군포시',
    '경기 광주시',
    '경기 이천시',
    '경기 양주시',
    '경기 오산시',
    '경기 구리시',
    '경기 안성시',
    '경기 포천시',
    '경기 의왕시',
    '경기 하남시',
    '경기 여주시',
    '경기 여주군',
    '경기 양평군',
    '경기 동두천시',
    '경기 과천시',
    '경기 가평군',
    '경기 연천군',
  ];
  async create() {
    for (let i = 0; i < this.locations.length; i++) {
      const value = this.locations[i].split(' ');
      const city = await this.cityRepository.findOne({
        where: {
          name: value[0],
        },
      });

      await this.districtRepository.save({
        district: value[1],
        city,
      });
    }
    return '저장 완료.';
  }

  async findAll() {
    return await this.districtRepository.find({
      relations: ['city'],
    });
  }
}
