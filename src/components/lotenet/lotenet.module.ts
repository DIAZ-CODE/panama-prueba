import { Module } from '@nestjs/common';
import { LotenetService } from './lotenet.service';
import { LotenetController } from './lotenet.controller';
import { MessageService } from './message.service';

@Module({
  controllers: [LotenetController],
  providers: [LotenetService, MessageService],
  exports: [LotenetService, MessageService],
})
export class LotenetModule {}
