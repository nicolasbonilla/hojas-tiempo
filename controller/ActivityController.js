
import { Activity } from "../Context/ActivityContext.js"
import Utilities from "../utilities/index.js"

export class ActivityController {
    
    static async indexActivities(req,res,next){

        try {
            const result = await Activity.indexActivities(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

    static async storeActivity(req,res,next){

        try {
            
            let request_validator = Utilities.validatorRequest(req.body,[
                'area_id',
                'name'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Activity.storeActivity(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }
    
    static async updateActivity(req,res,next){

        try {
            
            let request_validator = Utilities.validatorRequest(req.body,[
                'area_id',
                'name',
                'activity_id'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Activity.updateActivity(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}
