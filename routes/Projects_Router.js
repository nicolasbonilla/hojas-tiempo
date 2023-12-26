import express from "express"
import Projects_Controller from "../controller/Projects_Controller.js"

let router = express.Router()
router.post('/store_project', Projects_Controller.store_project)
router.post('/update_project', Projects_Controller.update_project)
export default router