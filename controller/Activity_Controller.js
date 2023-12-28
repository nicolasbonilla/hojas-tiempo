
import ActivityContext from "../Context/ActivityContext.js"

const Activity_Controller ={
    
    'index_activities': async function(req,res,next){

        try {

            const result = await ActivityContext.index_activities(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },    

    'store_activity': async function(req,res,next){

        try {

            const result = await ActivityContext.store_activity(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'update_activity': async function(req,res,next){

        try {

            const result = await ActivityContext.update_activity(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Activity_Controller