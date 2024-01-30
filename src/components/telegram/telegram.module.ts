import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TelegramServiceInit } from './telegram-init.service';
import { LotenetModule } from '../components';
import { MessageService } from './message.service';

@Module({
  imports: [LotenetModule],
  controllers: [TelegramController],
  providers: [TelegramService, TelegramServiceInit, MessageService],
})
export class TelegramModule {}
