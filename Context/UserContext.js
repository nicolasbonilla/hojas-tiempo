import UserService from "../Services/UserService.js"
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
    },

    "login":async(req)=>{

        const result = await UserService.index_email(req)
        const validacion_password = utilities.bcrypt_check(req.body.password, result.user.password);
        
        if(validacion_password.status){
            const token = utilities.token(result.user.user_id)
            // retorna user y token a partir de credenciales
            delete result.user.password
            return {"user":result.user, "token":token}
               
        }else{
            return  {'error':401 ,'message': 'Wrong passsword!'}
        }
    },

    "index_users":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await UserService.index_users(req)
       
        if(result.status){
            return result
        }else{
            return {message:'error en la consulta usuarios'}
        }
    },

    "store":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await UserService.store(req)
       
        if(result.status){
            return result.user
        }else{
            return {message:'error en la consulta guardar usuario'}
        }
    },

    "update":async (req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        if (req.body.password.length){
            req.body.password = utilities.bcrypt(req.body.password)
            const result = await UserService.update_full(req)
            if(result.status){
                return result.user
            }else{
                return {message:'error en la consulta actualizar usuario completo'}
            }
        }else{
            const result =  await UserService.update(req)
            if(result.status){
                return result
            }else{
                return {message:'error en la consulta actualizar usuario'}
            }
        }
    }

}

export default UserContext