
import AreaContext from "../Context/AreaContext.js"

const Controller ={
    
    'index_areas': async function(req,res,next){

        try {
            const result = await AreaContext.index_areas(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    'store_area': async function(req,res,next){

        try {
            const result = await AreaContext.store_area(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    },
    'update_area': async function(req,res,next){

        try {
            const result = await AreaContext.update_area(req)
            return res.json(result)
        }
        catch (error) {
            return res.status(500).json({ "error": 500, "message": error.message })
        }

    }

}

export default Controller