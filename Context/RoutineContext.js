import RoutineService from "../Services/RoutineService.js"
import Config from "../config/index.js"
export class Routine {

    static async storeRoutine(req){

        req.body.user_id = req.authenticated.validation.user_id
        const resultRoutines = await RoutineService.indexRoutinesUser(req.body)
        const routines = resultRoutines.status === true ? resultRoutines.routines : []
        if(routines.length > Config.get("app","storeRoutineLimit")){
            return {"status":false,"message":"¡Demasiadas repeticiones activas!"}
        }

        return await RoutineService.storeRoutine(req.body)
    }

    static async deleteRoutine(req){
        req.body.user_id = req.authenticated.validation.user_id
        return await RoutineService.deleteRoutine(req.body)
    }

}
