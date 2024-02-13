import express from "express"
import { TeamsController } from "../controller/TeamsController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_teams',Middleware.authenticated,TeamsController.indexTeams)
export default router