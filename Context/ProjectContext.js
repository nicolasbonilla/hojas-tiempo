import ProjectService from "../Services/ProjectService.js"

export class Project{
    
    constructor(){
        this.code = ''
        this.area_id = 0
        this.cost_center_id = 0
        this.name = ''
        this.client_id = 0
        this.project_status_id = 0
        this.user_id = 0
    }

    get project(){
        return this
    }

    async store(){
        return  await ProjectService.store_project(this.project)
    }

    fill(body){

        const Project = this.project

        for(let key in Project){

            let key_body = body[key] != undefined ? true : false
            
            if(key_body){

                if(typeof Project[key] === typeof body[key]){
                    this.project[key] = body[key]
                }
                else{
                    console.info('Project context | wrong parameter: '+key+' | type: '+typeof Project[key])
                }

            }else{
                console.info('Project context | missed parameter: '+key +' | type: '+typeof Project[key])
            }

        }
    }

    static async indexProject(req){

        const result = await ProjectService.index_projects(req)
       
        if(result.status){
            return {"projects":result.projects}
        }else{
            return {"status":false,"message":"error en la consulta proyectos"}
        }
    }

    static async storeProject(req){
        
        req.body.user_id = req.authenticated.validation.user_id

        const _Project = new Project()
        _Project.fill(req.body)
        const result = await _Project.store()
       
        if(result.status){
            return result
        }else{
            return {"status":false,"message":"error la crear proyecto"}
        }
    }

    static async updateProject(req){

        const result =  await ProjectService.update_project(req.body)
        if(result.status){
            return result
        }else{
            return {"status":false,"message":'error al actualizar proyecto'}
        }
    }

}
