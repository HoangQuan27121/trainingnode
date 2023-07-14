import { config } from "dotenv";
import path from "path";

config({ path: (process.cwd(), ".env") });

export const APP_CONFIG = {
  ROOT: path.normalize(__dirname + "/.."),
  PORT: process.env.PORT,
  DB_TYPE: process.env.DB_TYPE,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE,
  DB_DEBUG: process.env.DB_DEBUG
};

export const REDIS_CONFIG = {
  HOST: process.env.REDIS_HOST,
  PORT: process.env.REDIS_PORT,
  PREFIX: process.env.REDIS_PREFIX
};
