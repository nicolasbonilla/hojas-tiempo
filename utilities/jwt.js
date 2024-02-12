import jwt  from 'jsonwebtoken'
import Config from '../config/index.js'

const JWT = {

    generate: (user_id) => {
        let data = {
            time: Date(),
            user_id: user_id,
        }
        return jwt.sign(data, Config.get("app","jwt_sign"))
    },

    check: (req) => {

        //retorna validación del usuario a partir de un token
        try {

            const token = req.header(Config.get("app","jwt_header_key"))
            const verified = jwt.verify(token, Config.get("app","jwt_sign"))

            if(verified){
                return {'status': true, 'validation': verified}
            }else{
                return {'status': false, 'error': 401, 'message': 'validation token failed!'}
            }

        } catch (error) {
            return {'status': false, 'error': 401, 'message': 'validation token failed!'}
        }
    }
}

export default JWT