import { Test, TestingModule } from '@nestjs/testing';
import { LotenetController } from './lotenet.controller';
import { LotenetService } from './lotenet.service';

describe('LotenetController', () => {
  let controller: LotenetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LotenetController],
      providers: [LotenetService],
    }).compile();

    controller = module.get<LotenetController>(LotenetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
