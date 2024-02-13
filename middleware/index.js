import JWT from "../utilities/jwt.js"

const middleware = {
    authenticated:(req, res, next) => {
        const validation = JWT.check(req)
        if(!validation.status){
            return res.status(400).json({"error":401,"message":"Unauthorized"})
        }else{
            req.authenticated= { ...validation }
            next()
        }

    }
}

export default middleware