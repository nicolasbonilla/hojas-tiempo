
import { Aplication } from "../Context/AplicationContext.js"
import Utilities from "../utilities/index.js"

export class AplicationController {
    
    static async checkToken (req,res,next){

        try {
            const result = await Aplication.checkToken(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

    static async login(req,res,next){

        try {
            
            let request_validator = Utilities.validatorRequest(req.body,[
                'email',
                'password'
            ])

            if(!request_validator.status){
                return res.status(400).json(request_validator)
            }

            const result = await Aplication.login(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}
