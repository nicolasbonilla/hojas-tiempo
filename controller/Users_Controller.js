
import UserContext from "../Context/UserContext.js"

const Controller ={
    
    'store': async function(req,res,next){

        try {

            const result = await UserContext.store(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'update': async function(req,res,next){

        try {

            const result = await UserContext.update(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller