
import { Activity } from "../Context/ActivityContext.js"

const Activity_Controller ={
    
    'indexActivities': async function(req,res,next){

        try {

            const result = await Activity.indexActivities(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },    

    'storeActivity': async function(req,res,next){

        try {

            const result = await Activity.storeActivity(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'updateActivity': async function(req,res,next){

        try {

            const result = await Activity.updateActivity(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Activity_Controller