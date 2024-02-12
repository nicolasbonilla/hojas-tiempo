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
        return  await ActivityService.store_activity(this.activity)
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

        const result = await ActivityService.index_activities()
       
        if(result.status){
            return result
        }else{
            return {"status":false,"message":"error al consultar actividades"}
        }
    }

    static async storeActivity(req){

        const _Activity = new Activity()
        _Activity.fill(req.body)
        const result = await _Activity.store()

        if(result.status){
            return result
        }else{
            return {"status":false,"message":"error al guardar una actividad"}
        }
    }

    static async updateActivity(req){

        const result =  await ActivityService.update_activity(req.body)
        if(result.status){
            return result
        }else{
            return {"status":false,"message":"error al actualizar actividad"}
        }

    }

}
