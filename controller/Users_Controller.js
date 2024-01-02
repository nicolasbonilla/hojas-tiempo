
import UserContext from "../Context/UserContext.js"

const Controller ={

    'index_users': async function(req,res,next){

        try {
            const result = await UserContext.index_users(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'store_user': async function(req,res,next){

        try {

            const result = await UserContext.store_user(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'update_user': async function(req,res,next){

        try {

            const result = await UserContext.update_user(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller