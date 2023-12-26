import express from "express"
import Activity_Controller from "../controller/Activity_Controller.js"

let router = express.Router()
router.post('/store_activity', Activity_Controller.store_activity)
router.post('/update_activity', Activity_Controller.update_activity)
export default router