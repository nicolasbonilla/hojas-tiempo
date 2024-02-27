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
        return  await HourService.storeHour(this.hour)
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
        
        req.body = {...req.body, date: req.body.monthCurrentStart }
        const result = await HourService.indexHoursMonth(req.body)
       
        req.body = {...req.body, date: req.body.monthPrevStart }
        const prevs = await HourService.indexHoursMonth(req.body)
        
        req.body = {...req.body, date: req.body.monthOldStart }
        const olds = await HourService.indexHoursMonth(req.body)

        req.body = {...req.body,start: req.body.monthCurrentStart, end: req.body.monthCurrentEnd }
        const resultRoutines = await RoutineService.indexRoutinesRangeMonth(req.body)
        
        const routines = resultRoutines.status === true ? resultRoutines.routines : []

        if(!result.status || !prevs.status || !olds.status ){
            return {"status":false,"message":"error en la consulta de tiempos por mes"}
        }
        
        return {"status":true,"hours":result.hours,"old":olds.hours,"prev":prevs.hours,"routines":routines}

    }

    static async indexHours(req){

        req.body.user_id = req.authenticated.validation.user_id
        const resultTimes = await HourService.indexHours(req.body)
        const resultRoutines = await RoutineService.indexRoutinesRange(req.body)
       
        if(resultTimes.status){
            const routines = resultRoutines.status === true ? resultRoutines.routines : []
            return {"status":true, "hours": resultTimes.hours, "routines": RoutineUtility.validateRangeTime(routines,req.body.date)}
        }else{
            return {"status":false,"message":"error en la consulta horas actual mes"}
        }
    }

    static async indexHoursBetween(req){
        return await HourService.indexHoursBetween(req.body.range)
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
                return result
            }

        }

        return{"status": true, "hours": hours}
    }

    static async updateHour(req){
        return await HourService.updateHour(req.body)
    }

    static async deleteHour(req){
        return await HourService.deleteHour(req.body)
    }
}
