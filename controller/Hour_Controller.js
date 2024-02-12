
import { Hours } from "../Context/HourContext.js"

const Controller ={

    'indexHours': async function(req,res,next){
        try {
            const result = await Hours.indexHours(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    },
    'indexHoursMonth': async function(req,res,next){
        try {
            const result = await Hours.indexHoursMonth(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    },
    'indexHoursBetween':async function(req,res,next){
        try {
            const result = await Hours.indexHoursBetween(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    },
    'storeHours': async function(req,res,next){
        try {
            const result = await Hours.storeHours(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    },
    'updateHour': async function(req,res,next){
        try {
            const result = await Hours.updateHour(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    },
    'deleteHour': async function(req,res,next){
        try {
            const result = await Hours.deleteHour(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

}

export default Controller