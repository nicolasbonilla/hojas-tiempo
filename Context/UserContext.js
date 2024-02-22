import UserService from "../Services/UserService.js"
import BCRYPT from "../utilities/bcrypt.js"

export class Users{

    constructor(){
        this.email=''
        this.password=''
        this.name = ''
        this.date_of_admission = ''
        this.work_days_id = 0
        this.salary = 0
        this.role_id = 0
        this.job_title_id = 0
        this.area_id = 0
        this.work_modality_id = 0
        this.location_id = 0
        this.status_id = 0
        this.active = 0
        this.phone_number = ''
        this.team_id = 0
    }

    get user(){
        return this
    }

    /**
     * @param {String} password
     */
    set _password(password){
        this.password = password
    }

    async store(){
        return await UserService.storeUser(this.user)
    }

    fill(body){

        const User = this.user

        for(let key in User){

            let key_body = body[key] != undefined ? true : false
            
            if(key_body){

                if(typeof User[key] === typeof body[key]){
                    this.user[key] = body[key]
                }
                else{
                    console.info('User context | wrong parameter: '+key+' | type: '+typeof User[key])
                }

            }else{
                console.info('User context | missed parameter: '+key +' | type: '+typeof User[key])
            }

        }
    }

    static async indexUsers(req){
        return await UserService.indexUsers(req.body)
    }

    static async storeUser(req){

        const _User = new Users()
        _User.fill(req.body)
        _User._password= BCRYPT.generate(req.body.password)
        const result = await _User.store()
        
        if(result.status){
            return {"status": true,"user": {...result.user,"password":""}  }
        }else{
            return {"status":false,"message":"error en la consulta guardar usuario"}
        }
    }

    static async updateUser(req){

        if (req.body.password.length){
            req.body.password = BCRYPT.generate(req.body.password)
            return await UserService.updateFull(req.body)
        }else{
            return await UserService.update(req.body)
        }
    }
}
