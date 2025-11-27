import { registerAs } from '@nestjs/config';

export default registerAs('web', () => ({
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3000',

  CORS: {
    ORIGIN: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map((v) => v.trim())
      : ['http://localhost:3000'],
    CREDENTIALS: true,
  },
}));
