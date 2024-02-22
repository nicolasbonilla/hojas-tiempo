import express from "express"
import { RoutineController } from "../controller/RoutineController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.post('/store_routine',Middleware.authenticated,RoutineController.storeRoutine)
router.delete('/delete_routine',Middleware.authenticated,RoutineController.deleteRoutine)
export default router