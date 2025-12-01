import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import * as schema from './schemas';
import type { DbConfig } from '@/common/config';

const DRIZZLE = 'DRIZZLE_CONNECTION';

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<MySql2Database<typeof schema>> => {
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

        return drizzle(pool, { schema, mode: 'default' });
      },
    },
  ],
  exports: [DRIZZLE],
})
export default class DatabaseModule {}
