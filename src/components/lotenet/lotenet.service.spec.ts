import { Test, TestingModule } from '@nestjs/testing';
import { LotenetService } from './lotenet.service';

describe('LotenetService', () => {
  let service: LotenetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LotenetService],
    }).compile();

    service = module.get<LotenetService>(LotenetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
