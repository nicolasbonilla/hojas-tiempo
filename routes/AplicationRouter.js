import express from "express"
import { AplicationController } from "../controller/AplicationController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/checktoken',Middleware.authenticated,AplicationController.checkToken)
router.post('/login',AplicationController.login)
export default router
