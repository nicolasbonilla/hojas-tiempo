import express from "express"
import { HourController } from "../controller/HourController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.post('/index_hours',Middleware.authenticated,HourController.indexHours)
router.post('/index_hours_month',Middleware.authenticated,HourController.indexHoursMonth)
router.post('/index_hours_between',Middleware.authenticated,HourController.indexHoursBetween)
router.post('/store_hours',Middleware.authenticated,HourController.storeHours)
router.put('/update_hour',Middleware.authenticated,HourController.updateHour)
router.delete('/delete_hour',Middleware.authenticated,HourController.deleteHour)
export default router