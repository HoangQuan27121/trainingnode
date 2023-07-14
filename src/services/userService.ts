import { config } from "dotenv";
import { TUserServices } from "../types/user.type";
import { users } from "../mock/dataUsers";

config({ path: (process.cwd(), ".env") });
const jwt = require('jsonwebtoken');


const accessTokenSecret = process.env.SECRET_KEY;

export const userLogin = (req: TUserServices, res: any) => {
    const { username, password } = req.body;
    const user = users.find(u => { return u.username === username && u.password === password });
    if(user) {
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
};

export const getDataProfileUser = (req: any, res: any) => {
    res.send(req.user)
}