import express from "express"
import Teams_Controller from "../controller/Teams_Controller.js"

let router = express.Router()
router.get('/index_teams', Teams_Controller.index_teams)
export default router