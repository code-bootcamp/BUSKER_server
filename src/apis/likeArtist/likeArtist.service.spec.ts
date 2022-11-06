import { Test, TestingModule } from '@nestjs/testing';
import { LikeArtistService } from './likeArtist.service';

describe('LikeService', () => {
  let service: LikeArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeArtistService],
    }).compile();

    service = module.get<LikeArtistService>(LikeArtistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
