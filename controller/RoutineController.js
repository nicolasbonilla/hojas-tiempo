
import { Routine } from "../Context/RoutineContext.js"

export class RoutineController {

    static async storeRoutine(req,res,next){
        try {
            const result = await Routine.storeRoutine(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({"error":500,"message":error.message})
        }
    }

}
