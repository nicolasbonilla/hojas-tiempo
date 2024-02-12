import express from "express"
import Aplication_Controller from "../controller/Aplication_Controller.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/checktoken',Middleware.authenticated,Aplication_Controller.checktoken)
router.post('/login',Aplication_Controller.login)
export default router
