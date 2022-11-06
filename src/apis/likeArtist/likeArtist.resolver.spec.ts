import { Test, TestingModule } from '@nestjs/testing';
import { LikeArtistResolver } from './likeArtist.resolver';

describe('LikeResolver', () => {
  let resolver: LikeArtistResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeArtistResolver],
    }).compile();

    resolver = module.get<LikeArtistResolver>(LikeArtistResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
