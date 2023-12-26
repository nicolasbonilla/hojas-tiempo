
import UserContext from "../Context/UserContext.js"

const Controller ={
    
    'checktoken': async function(req,res,next){

        try {
            const result = await UserContext.checktoken(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    'login': async function(req,res,next){

        try {
            // obtener usuario a partir de credenciales
            const result = await UserContext.login(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller