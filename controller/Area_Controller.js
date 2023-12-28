
import AreaContext from "../Context/AreaContext.js"

const Controller ={
    
    'store_area': async function(req,res,next){

        try {

            const result = await AreaContext.store_area(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    
    'update_area': async function(req,res,next){

        try {

            const result = await AreaContext.update_area(req)
            res.json(result)

        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller