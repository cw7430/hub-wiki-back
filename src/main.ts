import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCors from '@fastify/cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { type ConfigType } from '@nestjs/config';

import { AppModule } from './app.module';
import { appConfig, webConfig } from './common/config';
import { GlobalExceptionFilter } from './common/api';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const fastifyInstance = app.getHttpAdapter().getInstance();

  const appConfigValue = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const webConfigValue = app.get<ConfigType<typeof webConfig>>(webConfig.KEY);

  await fastifyInstance.register(fastifyCors, {
    origin: webConfigValue.CORS.ORIGIN,
    credentials: webConfigValue.CORS.CREDENTIALS,
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hub Wiki Backend API')
    .setDescription('Namuwiki-style wiki API with version management.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfigValue.PORT);
}
bootstrap();
