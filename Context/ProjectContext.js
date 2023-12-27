import UserService from "../Services/UserService.js"
import ProjectService from "../Services/ProjectService.js"
import utilities from "../utilities/index.js"

const ProjectContext ={

    "index_project":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await ProjectService.index_projects(req)
       
        if(result.status){
            return {"projects":result.projects}
        }else{
            return {message:'error en la consulta'}
        }
    },

    "store_project":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await ProjectService.store_project(req)
       
        if(result.status){
            return {"project":result.project}
        }else{
            return {message:'error en la consulta'}
        }
    },

    "update_project":async (req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }
        const result =  await ProjectService.update_project(req)
        if(result.status){
            return result
        }else{
            return {"error":300,"message":'error al actualizar proyecto'}
        }
    }

}

export default ProjectContext