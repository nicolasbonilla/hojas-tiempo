import express from "express"
import Users_Controller from "../controller/Users_Controller.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_users',Middleware.authenticated,Users_Controller.index_users)
router.post('/store_user',Middleware.authenticated,Users_Controller.store_user)
router.put('/update_user',Middleware.authenticated,Users_Controller.update_user)
export default router