const { defineConfig } = require('drizzle-kit');
const dotenv = require('dotenv');

// 1) 공통 .env 로드
dotenv.config();

// 2) 환경별 로컬 파일 명시적으로 로드 (.env.local 있음)
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

module.exports = defineConfig({
  dialect: 'mysql',
  schema: './src/common/database/schemas/**/*.ts',
  out: './drizzle',

  dbCredentials: {
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'hub_wiki_local',
  },
});
