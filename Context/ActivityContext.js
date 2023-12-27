import UserService from "../Services/UserService.js"
import ActivityService from "../Services/ActivityService.js"
import utilities from "../utilities/index.js"

const ActivityContext ={

    "store_activity":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await ActivityService.store_activity(req)
       
        if(result.status){
            return result.activity
        }else{
            return {message:'error en la consulta'}
        }
    },

    "update_activity":async (req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }
            const result =  await ActivityService.update_activity(req)
            if(result.status){
                return result.activity
            }else{
                return {message:'error en la consulta2'}
            }

    }

}

export default ActivityContext