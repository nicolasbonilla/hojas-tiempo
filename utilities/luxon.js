import { DateTime } from "luxon"

const luxon = {
    'getMonthsInRange':(range)=>{

        const { start, end } = range

        const _start = DateTime.fromISO(start)
        const _end = DateTime.fromISO(end)
        const monthsInRange = []

        let currentDate = _start
        while (_end >= currentDate){
            monthsInRange.push({"start":currentDate.startOf("month").toFormat('yyyy-MM-dd'),"end":currentDate.endOf("month").toFormat('yyyy-MM-dd')})
            currentDate = currentDate.plus({months:1})
        }

        return monthsInRange
    },
    'getHoursInMonth':(monthRange,holidays)=>{
        const dateCheckIn = DateTime.fromISO(monthRange.start)
        const dateCheckOut = DateTime.fromISO(monthRange.end)
        const diferenceDays = dateCheckOut.diff(dateCheckIn,["years","months","days"]).as("days")
        let diffDays = 0
        // en el primer ciclo no se añade un día porque el index esta en 0 por tanto sigue siendo el valor inicial del rango de fecha
        // se añade 1 a la variable diferenceDays porque en el primer ciclo siguie siendo el primer dia
        for(let index = 0; index < diferenceDays+1; index++){
            // validar si el dia no es sabado o domingo o festivo
            const newDate = dateCheckIn.plus({days:index})
            // 1 lunes - 7 domingo
            if(newDate.weekday < 6 && !holidays.some((h)=>h.date === newDate.toFormat("yyyy-MM-dd"))){
                diffDays++
            }
        }
        return {...monthRange,idealHours:diffDays*9}   
    }

}

export default luxon
