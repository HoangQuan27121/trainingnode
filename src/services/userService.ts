import { config } from "dotenv";
import { TUserServices } from "../types/user.type";
import { users } from "../mock/dataUsers";
import {UserRepository} from '../modules/user/user.repository';
config({ path: (process.cwd(), ".env") });
const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.SECRET_KEY;
export class UserService {
    constructor(
        private repository = new UserRepository(),
    ) {}

     userLogin = async (req: TUserServices, res: any) => {
        const { username, password, role } = req.body;
        const dataRepUser = {
          username,
          password,
          role
        }
        const getUserData = await this.repository.getDataUserByUserName(username);
        console.log("checkDataGetuser", getUserData)
        if(getUserData) {

        } else {
          const insertUser = await this.repository.insertUserData(dataRepUser)
        }
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
    getDataProfileUser = (req: any, res: any) => {
        res.send(req.user)
    }
    
}