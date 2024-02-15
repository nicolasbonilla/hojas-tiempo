
import { Report } from "../Context/ReportContext.js"
import Utilities from "../utilities/index.js"

export class ReportController {

    static async indexReportXlsxRange(req,res,next){
        try {

            let request_validator = Utilities.validatorRequest(req.body,[
                'start',
                'end'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Report.indexReportXlsxRange(req,res)
            
            if(result.status){
                res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                res.setHeader('Content-Disposition','attachment; filename="reporte.xlsx"')
                return res.send(result.report)
            }else{
                return res.json({"status":false,"message":"error al generar reporte"})
            }

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }



}
