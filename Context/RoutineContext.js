import RoutineService from "../Services/RoutineService.js"
import Utilities from "../utilities/index.js"

export class Routine {

    static async storeRoutine(req){
        
        let requestValidator = Utilities.validatorRequest(req.body,[
            'start',
            'end',
            'routine',
        ])

        if(!requestValidator.status){
            return res.status(400).json(requestValidator)
        }

        req.body.user_id = req.authenticated.validation.user_id
        const result = await RoutineService.storeRoutine(req.body)
        if(result.status){
            return result
        }else{
            return {message:'error al guardar una rutina'}
        }
    }

}
