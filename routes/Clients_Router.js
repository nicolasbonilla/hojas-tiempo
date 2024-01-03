import express from "express"
import Client_Controller from "../controller/Client_Controller.js"

let router = express.Router()
router.get('/index_clients', Client_Controller.index_clients)
export default router