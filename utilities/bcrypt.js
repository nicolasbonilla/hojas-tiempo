import bcrypt from 'bcrypt'

const BCRYPT = {

    generate: function(string){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(string,salt)
        return hash
    },

    check: (string,hash) => {
        let status = false
        status = bcrypt.compareSync(string, hash)
        if(!status){
            return  {'error':401 ,'message': 'Wrong password!'}
        }else{
            return  {'status': status }
        }
    }
}

export default BCRYPT