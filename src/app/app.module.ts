import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationENV, config } from 'src/config/config';
import { LotenetModule } from 'src/components/components';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [config],
      validationSchema: validationENV(),
    }),
    LotenetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
