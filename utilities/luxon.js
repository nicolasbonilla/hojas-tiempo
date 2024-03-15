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
    }

}

export default luxon
