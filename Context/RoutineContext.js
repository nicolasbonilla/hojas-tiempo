import RoutineService from "../Services/RoutineService.js"

export class Routine {

    static async storeRoutine(req){
        req.body.user_id = req.authenticated.validation.user_id
        return await RoutineService.storeRoutine(req.body)
    }

    static async deleteRoutine(req){
        req.body.user_id = req.authenticated.validation.user_id
        return await RoutineService.deleteRoutine(req.body)
    }

}
