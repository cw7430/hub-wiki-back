import { registerAs } from '@nestjs/config';

export interface WebConfig {
  FRONTEND_URL: string;
  CORS: {
    ORIGIN: string[];
    CREDENTIALS: boolean;
  };
}

export default registerAs(
  'web',
  (): WebConfig => ({
    FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3000',

    CORS: {
      ORIGIN: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map((v) => v.trim())
        : ['http://localhost:3000'],
      CREDENTIALS: true,
    },
  }),
);
