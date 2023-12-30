
import HourContext from "../Context/HourContext.js"

const Controller ={

    'index_hours': async function(req,res,next){
        try {
            const result = await HourContext.index_hours(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    },
    'store_hours': async function(req,res,next){
        try {
            const result = await HourContext.store_hours(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    },
    
    'update_hour': async function(req,res,next){
        try {
            const result = await HourContext.update_hour(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    },
    'delete_hour': async function(req,res,next){
        try {
            const result = await HourContext.delete_hour(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

}

export default Controller