import UserService from "../Services/UserService.js"
import ProjectService from "../Services/ProjectService.js"
import utilities from "../utilities/index.js"

const ProjectContext ={


    "store_project":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await ProjectService.store(req)
       
        if(result.status){
            return result.project
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
        const result =  await ProjectService.update(req)
        if(result.status){
            return result.project
        }else{
            return {message:'error en la consulta2'}
        }
    }

}

export default ProjectContext