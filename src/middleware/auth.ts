import { config } from "dotenv";
import { TUserServices } from "../types/user.type";

config({ path: (process.cwd(), ".env") });
const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.SECRET_KEY;

export const authenticateJWT = (req: TUserServices, res: any, next: any) => {
    console.log("checkRes", req)
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log("checkUer", user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};