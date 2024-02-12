import express from "express"
import Client_Controller from "../controller/Client_Controller.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_clients',Middleware.authenticated,Client_Controller.index_clients)
export default router