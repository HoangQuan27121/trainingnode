import express, { Express } from "express";
import morgan from "morgan";
import { connectDb } from "./database";
import Logger from "./libs/logger";
import bodyParser from "body-parser";
import cors from "cors";
import { APP_CONFIG } from "./configs";
import loadQueueBoard from "./libs/queue/bull-board";
import { initScheduledJobs } from "./cron";
import { getDataProfile, loginWithPassword } from "./modules/user/controller";
import { METHOD_API } from "./constants/methodApi";
import { authenticateJWT } from "./middleware/auth";

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

const routes = [
  {
    path: '/profile',
    method: 'get',
    controller: (req: Request, res: Response) => getDataProfile(req, res),
    middleware: authenticateJWT,
  },
  {
    path: '/login',
    method: 'post',
    controller: (req: Request, res: Response) => loginWithPassword(req, res),
  },
]

routes.forEach((route: any) => {
  if(route.method === METHOD_API.get) {
    app.get(route.path, route.middleware, (req, res) => route.controller(req, res))
  }
  if(route.method === METHOD_API.post) {
    app.post(route.path, (req, res) => route.controller(req, res))
  }
})


app.listen(PORT, () => {
  Logger.info(`App running on port ` + PORT);
});
