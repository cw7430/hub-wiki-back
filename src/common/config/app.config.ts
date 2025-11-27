import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  NODE_ENV: process.env.NODE_ENV ?? 'local',
  PORT: Number(process.env.PORT ?? 4000),
}));
