import HourService from "../Services/HourService.js"
import RoutineService from "../Services/RoutineService.js"
import RoutineUtility from "../utilities/routine.js"
export class Hours {

    constructor(){
        this.project_id= 0
        this.activity_id= 0
        this.hours= 0
        this.date= ''
        this.comments= ''
        this.user_id=0
    }

    get hour(){
        return this
    }

    async store(){
        return  await HourService.store_hour(this.hour)
    }

    fill(body){

        const Hour = this.hour

        for(let key in Hour){

            let key_body = body[key] != undefined ? true : false
            
            if(key_body){

                if(typeof Hour[key] === typeof body[key]){
                    this.hour[key] = body[key]
                }
                else{
                    console.info('Hour context | wrong parameter: '+key+' | type: '+typeof Hour[key])
                }

            }else{
                console.info('Hour context | missed parameter: '+key +' | type: '+typeof Hour[key])
            }

        }

    }

    static async indexHoursMonth (req){
        
        req.body.user_id = req.authenticated.validation.user_id
        const result = await HourService.index_hours_month(req.body)
       
        req.body = {...req.body, date: req.body.old }
        const olds = await HourService.index_hours_month(req.body)
        
        req.body = {...req.body, date: req.body.prev }
        const prevs = await HourService.index_hours_month(req.body)
       
        if(!result.status || !olds.status || !prevs.status ){
            return {"status": false, "message":"error en la consulta horas por mes"}
        }
        
        return {"status":true,"hours": result.hours, "old": olds.hours, "prev": prevs.hours }

    }

    static async indexHours(req){

        req.body.user_id = req.authenticated.validation.user_id
        const resultTimes = await HourService.index_hours(req.body)
        const resultRoutines = await RoutineService.indexRoutinesRange(req.body)
       
        if(resultTimes.status){
            const routines = resultRoutines.status === true ? resultRoutines.routines : []
            return {"status":true, "hours": resultTimes.hours, "routines": RoutineUtility.validate(routines,req.body.date)}
        }else{
            return {"status":false,"message":"error en la consulta horas actual mes"}
        }
    }

    static async indexHoursBetween(req){
 
        const result = await HourService.index_hours_between(req.body.range)
       
        if(result.status){
            return result
        }else{
            return {"status":false,"message":"error al consultar registros de tiempos por rango"}
        }

    }

    static async storeHours(req){

        let registros = req.body.hours || []

        let hours = []
        for (let index = 0; index < registros.length; index++){

            let element = registros[index]
            element.user_id = req.authenticated.validation.user_id
            
            const _Hour = new Hours()
            _Hour.fill(element)
            const result = await _Hour.store()
            
            if(result.status){
                hours.push(result.hour)
            }else{
                return {"status":false,message:"Error al crear un registro de tiempo"}
            }

        }

        return{"status": true, "hours": hours}
    }

    static async updateHour(req){

        const result =  await HourService.update_hour(req.body)
        if(result.status){
            return result 
        }else{
            return {"status":false, message:"error al actualizar un registro de tiempo"}
        }
    }

    static async deleteHour(req){

        const result =  await HourService.delete_hour(req.body)
        if(result.status){
            return result
        }else{
            return {"status":false, message:"error al eliminar un registro de hora"}
        }
    }
}
