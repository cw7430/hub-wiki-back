import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig, dbConfig, webConfig } from './common/config';
import DocModule from './modules/doc/doc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`, `.env`],
      load: [appConfig, dbConfig, webConfig],
    }),
    DocModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
