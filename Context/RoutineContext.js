import RoutineService from "../Services/RoutineService.js"
import Config from "../config/index.js"
import { DateTime } from "luxon"

export class Routine {

    static async storeRoutine(req){

        req.body.user_id = req.authenticated.validation.user_id
        const resultRoutines = await RoutineService.indexRoutinesUser(req.body)
        const routines = resultRoutines.status === true ? resultRoutines.routines : []
        if(routines.length > Config.get("app","storeRoutineLimit")){
            return {"status":false,"message":"¡Demasiadas repeticiones activas!"}
        }

        const result = await RoutineService.storeRoutine(req.body)
        if(!result.status){
            return result
        }

        let _start =  DateTime.fromFormat(result.routine.start,"yyyy/MM/dd").toFormat("yyyy-MM-dd")
        let _end =  DateTime.fromFormat(result.routine.end,"yyyy/MM/dd").toFormat("yyyy-MM-dd")

        return {"status":true,"routine":{...result.routine,"start":_start,"end":_end}}
    
    }

    static async deleteRoutine(req){
        req.body.user_id = req.authenticated.validation.user_id
        return await RoutineService.deleteRoutine(req.body)
    }

}
