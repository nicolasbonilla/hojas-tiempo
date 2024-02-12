import express from "express"
import Jobs_Controller from "../controller/Jobs_Controller.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_jobs',Middleware.authenticated,Jobs_Controller.index_jobs)
export default router