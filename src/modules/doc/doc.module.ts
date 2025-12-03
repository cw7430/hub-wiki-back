import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import DatabaseModule from '@/common/database/database.module';
import DocRepository from './doc.repository';
import DocService from './doc.service';
import DocController from './doc.controller';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [DocService, DocRepository],
  controllers: [DocController],
})
export default class DocModule {}
