import express, { Express } from "express";
import morgan from "morgan";
import { connectDb } from "./database";
import Logger from "./libs/logger";
import bodyParser from "body-parser";
import cors from "cors";
import { APP_CONFIG } from "./configs";
import loadQueueBoard from "./libs/queue/bull-board";
import { initScheduledJobs } from "./cron";
import { METHOD_API } from "./constants/methodApi";
import { authenticateJWT } from "./middleware/auth";
import { routes } from "./configs/routes";
import { TUserServices } from "./types/user.type";
import { Request, Response } from "express";

connectDb();

const app: Express = express();
const PORT: any = APP_CONFIG.PORT;

loadQueueBoard(app);
initScheduledJobs();
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

routes.forEach((route) => {
  if(route.method === METHOD_API.get) {
    route.middleware ? 
    app.get(route.path, route.middleware, (req, res) => route.controller(req, res))
    : app.get(route.path, (req, res) => route.controller(req, res))
  }
  if(route.method === METHOD_API.post) {
    route.middleware ? 
    app.post(route.path, route.middleware, (req, res) => route.controller(req, res))
    : app.post(route.path, (req, res) => route.controller(req, res))
  }
})


app.listen(PORT, () => {
  Logger.info(`App running on port ` + PORT);
});
