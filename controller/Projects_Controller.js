
import { Project } from "../Context/ProjectContext.js"

const Controller ={
    
    'index_project': async function(req,res,next){

        try {

            const result = await Project.indexProject(req)
            return res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'store_project': async function(req,res,next){

        try {

            const result = await Project.storeProject(req)
            return res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'update_project': async function(req,res,next){

        try {

            const result = await Project.updateProject(req)
            return res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller