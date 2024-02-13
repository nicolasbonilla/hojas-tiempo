
import { Areas } from "../Context/AreaContext.js"
import Utilities from "../utilities/index.js"

export class AreaController {
    
    static async indexAreas(req,res,next){
        try {
            const result = await Areas.indexAreas(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

    static async storeArea(req,res,next){
        try {
            let request_validator = Utilities.validatorRequest(req.body,[
                'name',
                'acronym'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Areas.storeArea(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

    static async updateArea(req,res,next){
        try {

            let request_validator = Utilities.validatorRequest(req.body,[
                'area_id',
                'name',
                'acronym'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Areas.updateArea(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

}
