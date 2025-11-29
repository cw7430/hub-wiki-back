import { registerAs } from '@nestjs/config';

export interface DbConfig {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string;
  NAME: string;
  CHARSET: string;
  TIMEZONE: string;
}

export default registerAs(
  'db',
  (): DbConfig => ({
    HOST: process.env.DB_HOST ?? '127.0.0.1',
    PORT: Number(process.env.DB_PORT ?? 3306),
    USER: process.env.DB_USER ?? 'root',
    PASSWORD: process.env.DB_PASSWORD ?? '',
    NAME: process.env.DB_NAME ?? 'hub_wiki_local',
    CHARSET: process.env.DB_CHARSET ?? 'utf8mb4',
    TIMEZONE: process.env.DB_TIMEZONE ?? 'Z',
  }),
);
