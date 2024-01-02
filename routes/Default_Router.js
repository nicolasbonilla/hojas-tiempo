import express from "express"
import Config from "../config/index.js"

let router = express.Router()

router.get('/', async function(req,res,next){

    try {

        // vista por defecto en public
        // archivo index.html eliminado para forzar redireccionamiento a views

        //vista respuesta por defecto en views

        //res.sendFile('index.html', { 'root': './views' } )

        //vista renderizada por defecto en views 
        
        //############### RUTA POR DEFECTO #################################
        
        let server_date = new Date()
        res.render('index',{
            'server_date': server_date.toString(),
            'version': Config.version, 
        })

    }catch(error){
        return res.status(500).json({ "error": 500, "message": error.message })
    }

})

export default router
