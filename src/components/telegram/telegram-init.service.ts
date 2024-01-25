import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Injectable()
export class TelegramServiceInit implements OnModuleInit {
  private logger: Logger = new Logger('Telegram-Init-Service');
  constructor(private readonly telegramService: TelegramService) {}

  async onModuleInit() {
    this.logger.debug('Inicio el bot de telegram');
    this.telegramService.init();
  }
}
