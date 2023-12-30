import express from "express"
import Users_Controller from "../controller/Users_Controller.js"

let router = express.Router()
router.get('/index_users', Users_Controller.index_users)
router.post('/store', Users_Controller.store)
router.post('/update', Users_Controller.update)
export default router