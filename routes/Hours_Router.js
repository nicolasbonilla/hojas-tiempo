import express from "express"
import Hour_Controller from "../controller/Hour_Controller.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.post('/index_hours',Middleware.authenticated,Hour_Controller.indexHours)
router.post('/index_hours_month',Middleware.authenticated,Hour_Controller.indexHoursMonth)
router.post('/index_hours_between',Middleware.authenticated,Hour_Controller.indexHoursBetween)
router.post('/store_hours',Middleware.authenticated,Hour_Controller.storeHours)
router.put('/update_hour',Middleware.authenticated,Hour_Controller.updateHour)
router.delete('/delete_hour',Middleware.authenticated,Hour_Controller.deleteHour)
export default router