import express from "express"
import { AreaController } from "../controller/AreaController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_areas',Middleware.authenticated,AreaController.indexAreas)
router.post('/store_area',Middleware.authenticated,AreaController.storeArea)
router.put('/update_area',Middleware.authenticated,AreaController.updateArea)
export default router
