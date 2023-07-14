import { Request, Response } from "express";
import {
  UserService
} from "../../services/userService";

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService()
  }
  getDataProfile = (req: Request, res: Response) => {
    const resp = this.userService.getDataProfileUser(req, res);
    return resp;
  };

  loginWithPassword = (req: Request, res: Response) => {
    return this.userService.userLogin(req, res);
  };
}
