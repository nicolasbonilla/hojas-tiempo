import express from "express"
import { ReportController } from "../controller/ReportController.js"
import Middleware from "../middleware/index.js"

let router = express.Router()
router.post('/report_hours_xlsx_range',Middleware.authenticated,ReportController.ReportHoursXlsxRange)
export default router