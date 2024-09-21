import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationENV, config } from './../config/config';
import {
  LotenetModule,
  //TelegramModule,
  //BotWhatModule,
  //UsersModule,
} from './../components/components';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [config],
      validationSchema: validationENV(),
    }),
    LotenetModule,
    //TelegramModule,
    //UsersModule,
    //BotWhatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
