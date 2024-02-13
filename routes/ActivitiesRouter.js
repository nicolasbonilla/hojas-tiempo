import express from "express"
import { ActivityController } from "../controller/ActivityController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_activities',Middleware.authenticated,ActivityController.indexActivities)
router.post('/store_activity',Middleware.authenticated,ActivityController.storeActivity)
router.put('/update_activity',Middleware.authenticated,ActivityController.updateActivity)
export default router