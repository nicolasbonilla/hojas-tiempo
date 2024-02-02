import jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const utilities = { 

    token: (user_id) => {
        let data = {
            time: Date(),
            user_id: user_id,
        }
        const token = jwt.sign(data, 'Axon_time')
        return token
    },

    bcrypt_check: (string,hash) => {
        let status = false
        status = bcrypt.compareSync(string, hash)
        if(!status){
            return  {'error':401 ,'message': 'Wrong password!'}
        }else{
            return  {'status': status }
        }
    },

    jwt_check : (req) => {

        //retorna id del usuario a a partir de un token
        let jwtSecretKey = 'Axon_time'
        let tokenHeaderKey = 'token'
        
        try {

            const token = req.header(tokenHeaderKey)
            const verified = jwt.verify(token, jwtSecretKey)

            if(verified){
                //return res.send("Successfully Verified")
                return {'status': true, 'user_id': verified.user_id}
            }else{
                // Access Denied
                //return res.status(401).send(error)
                return {'status': false, 'error': 401, 'message': 'validation token failed!'}
            }

        } catch (error) {
            // Access Denied
           // return res.status(401).send(error)
            console.error("error manejo en el token de verificación")
            return {'status': false, 'error': 401, 'message': 'validation token failed!!!!!!'}
        }
    },

    'bcrypt': function(string){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(string,salt)
        return hash
    }
}
export default utilities;
