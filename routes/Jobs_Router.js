import express from "express"
import Jobs_Controller from "../controller/Jobs_Controller.js"

let router = express.Router()
router.get('/index_jobs', Jobs_Controller.index_jobs)
export default router