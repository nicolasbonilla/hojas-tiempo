import UserService from "../Services/UserService.js"
import BCRYPT from "../utilities/bcrypt.js"
import JWT from "../utilities/jwt.js"

export class Aplication {

    static async checkToken (req){

        const result = await UserService.index_id({"user_id": req.authenticated.validation.user_id})
        if(result.user.user_id){
            const permissions = result.user.permissions.split(",").map((p)=>{
                try {
                    let permission = Number(p)
                    return permission
                } catch (error) {
                    
                }
            })
            const user = { ...result.user, "permissions": permissions }
            return {"status":true,"user":user}
        }else{
            return {"status":false,"error":404, "message":'Usuario no encontrado!'}
        }
    }

    static async login (req){

        const result = await UserService.index_email(req.body)
        
        if(!result.user.user_id){
            return  {'error':400,'message': 'Usuario no encontrado!'}
        }

        const validacion_password = BCRYPT.check(req.body.password, result.user.password);
        
        if(validacion_password.status){
            // retorna user y token a partir de credenciales
            const token = JWT.generate(result.user.user_id)
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
