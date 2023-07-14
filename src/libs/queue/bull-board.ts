import { glob } from "glob";
import path from "path";
import { APP_CONFIG } from "../../configs";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { Express } from "express";
import Logger from "../logger";

const loadQueueBoard = (app: Express) => {
  const queueList = glob.sync(
    path.normalize(`${APP_CONFIG.ROOT}/*/*.queue.{ts,js}`)
  );
  const queueAdapter = <BullAdapter[]>[];
  queueList.forEach((value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const queue = require(value).default;
    if (queue) {
      queueAdapter.push(new BullAdapter(queue));
      Logger.info(`Queue ${queue.name} has been load`);
    }
  });

  const serverAdapter = new ExpressAdapter();
  createBullBoard({
    queues: queueAdapter,
    serverAdapter: serverAdapter
  });

  serverAdapter.setBasePath("/admin/queues");
  app.use("/admin/queues", serverAdapter.getRouter());
};

export default loadQueueBoard;
