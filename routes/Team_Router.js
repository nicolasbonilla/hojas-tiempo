import express from "express"
import Teams_Controller from "../controller/Teams_Controller.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_teams',Middleware.authenticated,Teams_Controller.index_teams)
export default router