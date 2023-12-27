
import ProjectContext from "../Context/ProjectContext.js"

const Controller ={
    
    'store_project': async function(req,res,next){

        try {

            const result = await ProjectContext.store_project(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'update_project': async function(req,res,next){

        try {

            const result = await ProjectContext.update_project(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller