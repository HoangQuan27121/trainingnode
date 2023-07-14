import { authenticateJWT } from "../middleware/auth";
import { UserController } from "../modules/user/controller"
import { TUserServices } from "../types/user.type";
import { Request, Response } from "express"

interface IRoute {
    path: string;
    method: string;
    controller: (req: Request, res: Response) => void;
    middleware?: (req: Request, res: Response, next: any) => void;
}

const userController = new UserController();

export const routes: IRoute[] = [
    {
      path: '/profile',
      method: 'get',
      controller: (req: Request, res: Response) => userController.getDataProfile(req, res),
      middleware: (req: Request, res: Response, next: any) => authenticateJWT(req, res, next),
    },
    {
      path: '/login',
      method: 'post',
      controller: (req: Request, res: Response) => userController.loginWithPassword(req, res),
    //   middleware: (req: Request, res: Response, next: any) => authenticateJWT(req, res, next),
    },
  ]