import { DataSource } from "typeorm";
import { APP_CONFIG } from "../configs";
import Logger from "../libs/logger";

export const dataSource = new DataSource({
  type: "mysql",
  host: APP_CONFIG.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: APP_CONFIG.DB_USERNAME,
  password: APP_CONFIG.DB_PASSWORD,
  database: APP_CONFIG.DB_NAME,
  entities: [__dirname + "/../modules/**/*.model{.ts,.js}"],
  logging: Boolean(APP_CONFIG.DB_DEBUG) || false,
  synchronize: Boolean(APP_CONFIG.DB_SYNCHRONIZE) || false
});

export const connectDb = async () => {
  try {
    await dataSource.initialize();
    Logger.info("DB connected");
  } catch (err) {
    Logger.error("Could not connect to DB: ", err);
  }
};
