import express from "express"
import { JobsController } from "../controller/JobsController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_jobs',Middleware.authenticated,JobsController.indexJobs)
export default router