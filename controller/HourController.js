
import { Hours } from "../Context/HourContext.js"
import Utilities from "../utilities/index.js"

export class HourController {

    static async indexHours(req,res,next){
        try {

            let request_validator = Utilities.validatorRequest(req.body,[
                'date'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Hours.indexHours(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

    static async indexHoursMonth(req,res,next){
        try {
            
            let request_validator = Utilities.validatorRequest(req.body,[
                'date',
                'old',
                'prev',
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Hours.indexHoursMonth(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

    static async indexHoursBetween(req,res,next){
        try {
            
            let request_validator = Utilities.validatorRequest(req.body,[
                'range'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Hours.indexHoursBetween(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

    static async storeHours(req,res,next){
        try {
            
            let request_validator = Utilities.validatorRequest(req.body,[
                'hours'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Hours.storeHours(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

    static async updateHour(req,res,next){
        try {

            let request_validator = Utilities.validatorRequest(req.body,[
                'project_id',
                'activity_id',
                'hours',
                'date',
                'comments',
                'user_id',
                'hours_id'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Hours.updateHour(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

    static async deleteHour(req,res,next){
        try {

            let request_validator = Utilities.validatorRequest(req.body,[
                'hours_id'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Hours.deleteHour(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

}
