import express from "express"
import Users_Controller from "../controller/Users_Controller.js"

let router = express.Router()
router.get('/index_users', Users_Controller.index_users)
router.post('/store_user', Users_Controller.store_user)
router.put('/update_user', Users_Controller.update_user)
export default router