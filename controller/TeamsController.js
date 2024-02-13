
import { Teams } from "../Context/TeamContext.js"

export class TeamsController {

    static async indexTeams(req,res,next){
        try {
            const result = await Teams.indexTeams(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

}
