import HourService from "../Services/HourService.js"
import utilities from "../utilities/index.js"

const HourContext ={

    "index_hours":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }
        req.body.user_id = check_user.user_id
        const result = await HourService.index_hours(req)
       
        if(result.status){
            return result
        }else{
            return {message:'error en la consulta'}
        }
    },
    "index_hours_month":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        req.body.user_id = check_user.user_id
        const result = await HourService.index_hours_month(req)
       
        if(result.status){
            return result
        }else{
            return {message:'error en la consulta'}
        }
    },
    "store_hours":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        let registros = req.body.hours || []

        let hours = []
        for (let index = 0; index < registros.length; index++){

            let element = registros[index]
            element.user_id = check_user.user_id
            const result = await HourService.store_hour(element)
            if(result.status){
                hours.push(result.hour)
            }else{
                return {"status":false,message:'error al crear un registro de tiempo'}
            }

        }

        return{"status": true, "hours": hours}
    },
    "update_hour":async (req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }
        const result =  await HourService.update_hour(req)
        if(result.status){
            return result 
        }else{
            return {"status":false, message:'error al actualizar un registro de tiempo'}
        }
    },
    "delete_hour":async (req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }
        const result =  await HourService.delete_hour(req)
        if(result.status){
            return result
        }else{
            return {message:'error al eliminar un registro de hora'}
        }
    }

}

export default HourContext