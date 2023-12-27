
import HourContext from "../Context/HourContext.js"

const Controller ={
    
    'store_hour': async function(req,res,next){

        try {

            const result = await HourContext.store(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'update_hour': async function(req,res,next){

        try {

            const result = await HourContext.update(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller