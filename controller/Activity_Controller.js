
import ProjectContext from "../Context/ProjectContext.js"

const Controller ={
    
    'store_activity': async function(req,res,next){

        try {

            const result = await ActivityContext.store(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'update_activity': async function(req,res,next){

        try {

            const result = await ActivityContext.update(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller