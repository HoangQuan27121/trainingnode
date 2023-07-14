import Queue from "bull";
import { REDIS_CONFIG } from "../../configs";

import Logger from "../logger";

const initQueue = (queueName: string) => {
  const newQueue = new Queue(queueName, {
    redis: {
      host: REDIS_CONFIG.HOST,
      port: Number(REDIS_CONFIG.PORT),
      keyPrefix: REDIS_CONFIG.PREFIX
    }
  });

  newQueue.on("active", (job: any) => {
    Logger.info(`Job ${queueName}-${job.id} is active`);
  });

  newQueue.on("completed", (job: any, result: any) => {
    Logger.info(
      `Job ${queueName}-${job.id} completed with result ${result || "ok"}`
    );
  });

  newQueue.on("failed", (job: any) => {
    Logger.info(`job ${queueName}-${job.id} failed`);
  });

  newQueue.on("waiting", (job: any) => {
    Logger.info(`job ${queueName}-${job} waiting`);
  });

  newQueue.on("error", (error: any) => {
    Logger.info(`error init queue`, error);
  });

  return newQueue;
};

export default initQueue;
