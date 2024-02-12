import express from "express"
import Projects_Controller from "../controller/Projects_Controller.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_projects',Middleware.authenticated,Projects_Controller.index_project)
router.post('/store_project',Middleware.authenticated,Projects_Controller.store_project)
router.put('/update_project',Middleware.authenticated,Projects_Controller.update_project)
export default router