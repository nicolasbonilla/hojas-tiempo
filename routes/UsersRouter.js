import express from "express"
import { UsersController } from "../controller/UsersController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_users',Middleware.authenticated,UsersController.indexUsers)
router.post('/store_user',Middleware.authenticated,UsersController.storeUser)
router.put('/update_user',Middleware.authenticated,UsersController.updateUser)
export default router