import UserService from "../Services/UserService.js"
import utilities from "../utilities/index.js"
const AplicationContext ={

    "checktoken":async(req)=>{

        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        const result = await UserService.index_id(check_user.user_id)
        if(result.user.user_id){
            const permissions = result.user.permissions.split(",").map((p)=>{
                try {
                    let permission = Number(p)
                    return permission
                } catch (error) {
                    
                }
            })
            const user = { ...result.user, "permissions": permissions }
            return {"user":user}
        }else{
            return {"error":404, "message":'Usuario no encontrado!'}
        }
    },

    "login":async(req)=>{

        const result = await UserService.index_email(req)
        
        if(!result.user.user_id){
            return  {'error':400,'message': 'Usuario no encontrado!'}
        }

        const validacion_password = utilities.bcrypt_check(req.body.password, result.user.password);
        
        if(validacion_password.status){
            // retorna user y token a partir de credenciales
            const token = utilities.token(result.user.user_id)
            const permissions = result.user.permissions.split(",").map((p)=>{
                try {
                    let permission = Number(p)
                    return permission
                } catch (error) {
                    
                }
            })
            delete result.user.password
            const user = { ...result.user, "permissions": permissions }
            return {"user": user, "token":token}
               
        }else{
            return  {'error':401 ,'message': 'Contraseña incorrecta!'}
        }
    }

}

export default AplicationContext