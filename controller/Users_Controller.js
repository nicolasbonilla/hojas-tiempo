
import {Users} from "../Context/UserContext.js"

const Controller ={

    'index_users': async function(req,res,next){

        try {
            const result = await Users.indexUsers(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'store_user': async function(req,res,next){

        try {

            const result = await Users.storeUser(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'update_user': async function(req,res,next){

        try {

            const result = await Users.updateUser(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller