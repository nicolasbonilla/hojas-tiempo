import express from "express"
import Hour_Controller from "../controller/Hour_Controller.js"

let router = express.Router()
router.post('/index_hours', Hour_Controller.index_hours)
router.post('/store_hour', Hour_Controller.store_hour)
router.put('/update_hour', Hour_Controller.update_hour)
router.delete('/delete_hour', Hour_Controller.delete_hour)
export default router