import express from "express"
import Area_Controller from "../controller/Area_Controller.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.get('/index_areas',Middleware.authenticated,Area_Controller.index_areas)
router.post('/store_area',Middleware.authenticated,Area_Controller.store_area)
router.put('/update_area',Middleware.authenticated,Area_Controller.update_area)
export default router
