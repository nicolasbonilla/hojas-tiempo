import UserService from "../Services/UserService.js"
import HourService from "../Services/HourService.js"
import utilities from "../utilities/index.js"

const HourContext ={


    "store_hour":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await HourService.store_hour(req)
       
        if(result.status){
            return result.hour
        }else{
            return {message:'error en la consulta'}
        }
    },

    "update_hour":async (req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }
        const result =  await HourService.update_hour(req)
        if(result.status){
            return result.hour
        }else{
            return {message:'error en la consulta2'}
        }
    }

}

export default HourContext