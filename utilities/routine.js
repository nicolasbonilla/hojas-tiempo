import { DateTime } from "luxon"

const concurrencesDaysRoutinesConvention = {
    1:{"numRef":8,"name":"Lunes"},
    2:{"numRef":9,"name":"Martes"},
    3:{"numRef":10,"name":"Miercoles"},
    4:{"numRef":11,"name":"Jueves"},
    5:{"numRef":12,"name":"Viernes"}
}

const routine = {

    validateRangeTime: function(arrayRoutines,date){
        const _routinesFiltered = []
        const _dateUTC = DateTime.fromFormat(date,"yyyy/MM/dd").toUTC()
        
        for(let index = 0; index < arrayRoutines.length; index++){

            const element = arrayRoutines[index]
            const routineObject = element.routine
            const { routine, every, activity_id, project_id, hours } = routineObject

            const _dateStartRoutine = DateTime.fromJSDate(new Date(element.start)).toUTC()
            
            // repetir cada día // routines[0].id // every 1-7
            if(routine === 1){
                const differenceDays = _dateUTC.diff(_dateStartRoutine,'days')
                if((differenceDays.days % every) === 0){
                    _routinesFiltered.push(element)
                    continue
                }
            }

            // repetir dias en cada semana // routines[1].id // every 1-4
            if(routine === 2){
                // es oportuno establecer el inicio de semana para hacer la comprobación absoluta
                const startWeek = _dateUTC.startOf("week")
                const differenceWeeks = startWeek.diff(_dateStartRoutine,'weeks')
                if(( Math.round(differenceWeeks.weeks) % every) === 0 && routineObject.days.includes(_dateUTC.weekday)){
                    _routinesFiltered.push(element)
                    continue
                }
            }

            // repetir cada mes // routines[2].id // // every 1-12
            if(routine === 3){

                const differenceMonths = _dateUTC.diff(_dateStartRoutine,'months')
                if((Math.floor(differenceMonths.months) % every) === 0){
                    
                    let concurrence =  routineObject.concurrence // 1-5 // primer-último
                    // primer lunes-viernes del mes
                    let firstDay = _dateUTC.startOf("month").plus({ days: (concurrencesDaysRoutinesConvention[routineObject.day].numRef - _dateUTC.startOf("month").weekday) % 7 })
                    let allDays = []
                    while(firstDay.month === _dateUTC.month){
                        // Añadir el dia al array
                        allDays.push(firstDay)
                        // Sumar 7 días para obtener el siguiente dia
                        firstDay = firstDay.plus({ days: 7 })
                    }
                    
                    let routineDaySetting = concurrence == 5 ? allDays[allDays.length-1] : allDays[concurrence-1]
                    
                    if( _dateUTC.equals(routineDaySetting)){
                        _routinesFiltered.push(element)
                    }
                }
                    
            }
            
        }

        return _routinesFiltered
    }

}

export default routine