import UserService from "../Services/UserService.js"
import utilities from "../utilities/index.js"
const AplicationContext ={

    "checktoken":async(req)=>{

        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        const result = await UserService.index_id(check_user.user_id)
        if(result.status){
            return {"user":result.user}
        }else{
            return {"error":404, "message":'usuario no encontrado'}
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
    }

}

export default AplicationContext