import { Controller } from '@nestjs/common';
import { BotWhatService } from './bot-what.service';

@Controller()
export class BotWhatController {
  constructor(private readonly botWhatService: BotWhatService) {}
}
