import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
// @ts-ignore
import basicAuth from 'express-basic-auth';

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

  if (process.env.NODE_ENV === 'production') {
    app.use('/api', basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER || 'admin']: process.env.SWAGGER_PASSWORD || 'admin',
      },
    }));
  }

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-standalone-preset.min.js',
    ],
  });

  app.enableCors({
    origin: ['https://hugozera.space', 'https://www.hugozera.space', 'http://localhost:3000', 'http://localhost:3001', 'https://resiarteakin.com.br', 'https://www.resiarteakin.com.br', 'https://api.resiarteakin.com.br'],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });

  await app.startAllMicroservices()
  await app.listen(port, '0.0.0.0');

  process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Promessa rejeitada sem tratamento:', reason);
  });

}
bootstrap();