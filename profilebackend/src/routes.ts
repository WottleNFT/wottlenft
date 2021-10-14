import * as express from "express";
import { json, urlencoded } from "body-parser";
import { getUserInfo, registerUser, userLogin } from "./routes/accountsRoutes";
import { extractJWT } from "./ultility/passwordHandler";
const routes = express.Router();
routes.use(json())

routes.use(urlencoded({extended : true}))
routes.use(express.text())

function index(req: express.Request, res: express.Response) {
    res.json({ info: 'Wottle Profile Server is running.' })
}

routes.get('/', index)
routes.post('/register', registerUser)
routes.post('/login', userLogin)
routes.get('/userinfo', extractJWT, getUserInfo)
export default routes;