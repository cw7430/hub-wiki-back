import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { ConfigType } from '@nestjs/config';

import { appConfig, webConfig } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigValue = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const webConfigValue = app.get<ConfigType<typeof webConfig>>(webConfig.KEY);

  app.enableCors({
    origin: webConfigValue.CORS.ORIGIN,
    credentials: webConfigValue.CORS.CREDENTIALS,
  });

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
