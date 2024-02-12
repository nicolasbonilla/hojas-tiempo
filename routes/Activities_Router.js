import express from "express"
import Activity_Controller from "../controller/Activity_Controller.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_activities',Middleware.authenticated,Activity_Controller.indexActivities)
router.post('/store_activity',Middleware.authenticated,Activity_Controller.storeActivity)
router.put('/update_activity',Middleware.authenticated,Activity_Controller.updateActivity)
export default router