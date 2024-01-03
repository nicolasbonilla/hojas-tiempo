import UserService from "../Services/UserService.js"
import ActivityService from "../Services/ActivityService.js"
import utilities from "../utilities/index.js"

const ActivityContext ={

    "index_activities":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        const result = await ActivityService.index_activities(req)
       
        if(result.status){
            return {"activities":result.activities}
        }else{
            return {message:'error en la consulta'}
        }
    },

    "store_activity":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await ActivityService.store_activity(req)
       
        if(result.status){
            return {"activity":result.activity}
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
                return result
            }else{
                return {"message":"error al actualizar actividad"}
            }

    }

}

export default ActivityContext