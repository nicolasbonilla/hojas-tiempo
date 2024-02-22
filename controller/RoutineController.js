
import { Routine } from "../Context/RoutineContext.js"
import Utilities from "../utilities/index.js"

export class RoutineController {

    static async storeRoutine(req,res,next){
        try {
            
            let requestValidator = Utilities.validatorRequest(req.body,[
                'start',
                'end',
                'routine',
            ])
    
            if(!requestValidator.status){
                return res.status(400).json(requestValidator)
            }

            const result = await Routine.storeRoutine(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({"error":500,"message":error.message})
        }
    }

    static async deleteRoutine(req,res,next){
        try {
            
            let requestValidator = Utilities.validatorRequest(req.body,[
                'routine_id',
            ])
    
            if(!requestValidator.status){
                return res.status(400).json(requestValidator)
            }

            const result = await Routine.deleteRoutine(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({"error":500,"message":error.message})
        }
    }

}
