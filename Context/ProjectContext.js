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
        return  await ProjectService.storeProject(this.project)
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
        return await ProjectService.indexProjects(req)
    }

    static async storeProject(req){
        req.body.user_id = req.authenticated.validation.user_id
        const _Project = new Project()
        _Project.fill(req.body)
        return await _Project.store()
    }

    static async updateProject(req){
        return ProjectService.updateProject(req.body)
    }

}
