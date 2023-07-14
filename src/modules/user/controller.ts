import { getDataProfileUser, userLogin } from "../../services/userService";

export const getDataProfile = (req: any, res: any) => {
    const resp: any = getDataProfileUser(req, res);
    return resp;
};
export const loginWithPassword = (req: any, res: any) => {
    const resp: any = userLogin(req, res);
    return resp;
};