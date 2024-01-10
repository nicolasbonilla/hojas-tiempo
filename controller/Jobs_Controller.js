
import JobsContext from "../Context/JobsContext.js"

const Controller ={

    'index_jobs': async function(req,res,next){

        try {
            const result = await JobsContext.index_jobs(req)
            res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller