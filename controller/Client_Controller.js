
import ClientContext from "../Context/ClientContext.js"

const Controller ={

    'index_clients': async function(req,res,next){
        try {
            const result = await ClientContext.index_clients(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

}

export default Controller