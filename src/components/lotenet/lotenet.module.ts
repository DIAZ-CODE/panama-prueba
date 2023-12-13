import { Module } from '@nestjs/common';
import { LotenetService } from './lotenet.service';
import { LotenetController } from './lotenet.controller';

@Module({
  controllers: [LotenetController],
  providers: [LotenetService],
})
export class LotenetModule {}
