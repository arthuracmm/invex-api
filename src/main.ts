import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8000;
  const gatewayClient = configService.get<String>('GATEWAY_CLIENT');

  const config = new DocumentBuilder()
    .setTitle('Invex API')
    .setDescription('API do sistema de armazenamento INVEX')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(
      {
        type: 'apiKey',
        in: 'cookie',
        name: 'access_token',
        description: 'JWT via Cookie HttpOnly',
      },
      'cookie-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: `${gatewayClient}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.startAllMicroservices()
  await app.listen(port);

  process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Promessa rejeitada sem tratamento:', reason);
  });

}
bootstrap();