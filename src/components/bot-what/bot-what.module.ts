import { Module } from '@nestjs/common';
import { BotWhatService } from './bot-what.service';
import { BotWhatController } from './bot-what.controller';
import { BotWhattInit } from './bot-what-init.service';
import { LotenetModule, TelegramModule } from '../components';

@Module({
  imports: [LotenetModule, TelegramModule],
  controllers: [BotWhatController],
  providers: [BotWhatService, BotWhattInit],
})
export class BotWhatModule {}
