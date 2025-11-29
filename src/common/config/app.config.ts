import { registerAs } from '@nestjs/config';

export interface AppConfig {
  NODE_ENV: 'local' | 'development' | 'production';
  PORT: number;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    NODE_ENV:
      (process.env.NODE_ENV as 'local' | 'development' | 'production') ??
      'local',
    PORT: Number(process.env.PORT ?? 4000),
  }),
);
