import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import type { DbConfig } from '@/common/config';

const DRIZZLE = 'DRIZZLE_CONNECTION';

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const db = config.getOrThrow<DbConfig>('db');
        const pool = mysql.createPool({
          host: db.HOST,
          port: db.PORT,
          user: db.USER,
          password: db.PASSWORD,
          database: db.NAME,
          charset: db.CHARSET,
          waitForConnections: true,
          timezone: db.TIMEZONE,
        });
        return drizzle(pool);
      },
    },
  ],
  exports: [DRIZZLE],
})
export default class DatabaseModule {}
