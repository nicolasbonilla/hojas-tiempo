
import TeamContext from "../Context/TeamContext.js"

const Controller ={

    'index_teams': async function(req,res,next){
        try {
            const result = await TeamContext.index_teams(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

}

export default Controller