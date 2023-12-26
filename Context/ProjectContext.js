import UserService from "../Services/UserService.js"
import ProjectService from "../Services/ProjectService.js"
import utilities from "../utilities/index.js"
const UserContext ={

    "checktoken":async(req)=>{


        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        const result = await UserService.index_id(check_user.user_id)
        if(result.status){
            return result.user
        }else{
            return {message:'usuario no encontrado'}
        }
        // se lee el token del header y se responde con el ususario
        //return await UserService.index_email(req)
    },

    "store_project":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await ProjectService.store(req)
       
        if(result.status){
            return result.user
        }else{
            return {message:'error en la consulta'}
        }
    },

    "update_project":async (req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }
        const result =  await ProjectService.update(req)
        if(result.status){
            return result.user
        }else{
            return {message:'error en la consulta2'}
        }
    }

}

export default UserContext