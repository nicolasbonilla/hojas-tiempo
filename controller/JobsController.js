
import { Jobs } from "../Context/JobsContext.js"

export class JobsController {

    static async indexJobs(req,res,next){

        try {
            const result = await Jobs.indexJobs(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}
