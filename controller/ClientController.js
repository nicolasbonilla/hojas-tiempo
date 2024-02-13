
import { Clients } from "../Context/ClientContext.js"

export class ClientController {

    static async indexClients (req,res,next){
        try {
            const result = await Clients.indexClients(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }
    }

}
