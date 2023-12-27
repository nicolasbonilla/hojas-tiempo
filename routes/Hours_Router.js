import express from "express"
import Hour_Controller from "../controller/Hour_Controller.js"

let router = express.Router()
router.post('/store_hour', Hour_Controller.store_hour)
router.post('/update_hour', Hour_Controller.update_hour)
export default router