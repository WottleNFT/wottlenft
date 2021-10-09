import * as express from "express";
import { json, urlencoded } from "body-parser";
import { registerUser } from "./routes/userRoutes";
const routes = express.Router();
routes.use(json())

routes.use(urlencoded({extended : true}))
routes.use(express.text())

function index(req: express.Request, res: express.Response) {
    res.json({ info: 'Wottle Profile Server is running.' })
}

routes.get('/', index)
routes.post('/register', registerUser)
export default routes;