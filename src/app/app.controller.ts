import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponsePropio } from 'src/shared/response-propio';

@Controller('healthcheck')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthcheck(): ResponsePropio {
    return this.appService.healthcheck();
  }
}
