import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { BotWhatService } from './bot-what.service';

@Injectable()
export class BotWhattInit implements OnModuleInit {
  private logger: Logger = new Logger('Bot-Whatt-Init');
  constructor(private botWhatService: BotWhatService) {}

  async onModuleInit() {
    this.logger.debug('Inicio el bot de Whatt');
    this.botWhatService.init();
  }
}
