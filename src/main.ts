import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // linea para usar swagger
  const Config = new DocumentBuilder()
    .setTitle('API RED SOCIAL')
    .setDescription('Documentacion API')
    .setVersion('1.0')
    .build();

  const Document = SwaggerModule.createDocument(app, Config);

  SwaggerModule.setup('swagger', app, Document);
  // =========================================
  // =================importar la funcion del exception========================
  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );
  //================para verificar la informacion de las tablas========================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  // ======================================?
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
