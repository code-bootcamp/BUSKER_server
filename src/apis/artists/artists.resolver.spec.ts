import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsResolver } from './artists.resolver';

describe('ArtistsResolver', () => {
  let resolver: ArtistsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistsResolver],
    }).compile();

    resolver = module.get<ArtistsResolver>(ArtistsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
