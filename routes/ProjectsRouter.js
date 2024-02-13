import express from "express"
import { ProjectController } from "../controller/ProjectsController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_projects',Middleware.authenticated,ProjectController.indexProject)
router.post('/store_project',Middleware.authenticated,ProjectController.storeProject)
router.put('/update_project',Middleware.authenticated,ProjectController.updateProject)
export default router