import ActivityService from "../Services/ActivityService.js"

export class Activity{

    constructor(){
        this.area_id= 0
        this.name= ''
    }
    
    get activity(){
        return this
    }

    async store(){
        return await ActivityService.storeActivity(this.activity)
    }

    fill(body){

        const Activity = this.activity

        for(let key in Activity){

            let key_body = body[key] != undefined ? true : false
            
            if(key_body){

                if(typeof Activity[key] === typeof body[key]){
                    this.activity[key] = body[key]
                }
                else{
                    console.info('Activity context | wrong parameter: '+key+' | type: '+typeof Activity[key])
                }

            }else{
                console.info('Activity context | missed parameter: '+key +' | type: '+typeof Activity[key])
            }

        }
    }

    static async indexActivities (req){
        return await ActivityService.indexActivities()
    }

    static async storeActivity(req){
        const _Activity = new Activity()
        _Activity.fill(req.body)
        return await _Activity.store()
    }

    static async updateActivity(req){
        return await ActivityService.updateActivity(req.body)
    }

}
