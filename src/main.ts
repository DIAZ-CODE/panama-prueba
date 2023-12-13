import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT || 9999, () => {
    console.log(
      `👍El server esta arriba en el puerto: ${process.env.PORT || 9999} 👍💪`,
    );
  });
}
bootstrap();
