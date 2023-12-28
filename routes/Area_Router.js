import express from "express"
import Area_Controller from "../controller/Area_Controller.js"

let router = express.Router()
router.post('/store_area', Area_Controller.store_area)
router.post('/update_area', Area_Controller.update_area)
export default router
