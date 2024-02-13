import express from "express"
import { ClientController } from "../controller/ClientController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_clients',Middleware.authenticated,ClientController.indexClients)
export default router