
import { Project } from "../Context/ProjectContext.js"
import Utilities from "../utilities/index.js"

export class ProjectController {
    
    static async indexProject(req,res,next){

        try {
            const result = await Project.indexProject(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }
    
    static async storeProject(req,res,next){

        try {

            let request_validator = Utilities.validatorRequest(req.body,[
                'code',
                'area_id',
                'cost_center_id',
                'name',
                'client_id',
                'project_status_id'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Project.storeProject(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }
    
    static async updateProject(req,res,next){

        try {

            let request_validator = Utilities.validatorRequest(req.body,[
                'code',
                'area_id',
                'cost_center_id',
                'name',
                'client_id',
                'project_status_id',
                'project_id',
                'user_id'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Project.updateProject(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}
