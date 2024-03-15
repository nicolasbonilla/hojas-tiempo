
import { Users } from "../Context/UserContext.js"
import Utilities from "../utilities/index.js"

export class UsersController{

    static async indexUsers(req,res,next){

        try {
            const result = await Users.indexUsers(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }
    
    static async storeUser(req,res,next){

        try {

            let request_validator = Utilities.validatorRequest(req.body,[
                'email',
                'password',
                'name',
                'date_of_admission',
                'work_days_id',
                'salary',
                'role_id',
                'job_title_id',
                'area_id',
                'work_modality_id',
                'location_id',
                'status_id',
                'active',
                'phone_number',
                'team_id'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Users.storeUser(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }
    
    static async updateUser(req,res,next){

        try {

            let request_validator = Utilities.validatorRequest(req.body,[
                'user_id',
                'email',
                'password',
                "ID",
                'name',
                'date_of_admission',
                'work_days_id',
                'salary',
                'role_id',
                'job_title_id',
                'area_id',
                'work_modality_id',
                'location_id',
                'status_id',
                //'active',
                //'phone_number',
                //'team_id' // este valor puede estar nulo en la db y no pasa esta validacíon
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Users.updateUser(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}
