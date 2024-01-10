import JobService from "../Services/JobService.js"
import utilities from "../utilities/index.js"

const JobsContext ={

    "index_jobs":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await JobService.index_jobs(req)
       
        if(result.status){
            return result
        }else{
            return {message:'error en la consulta trabajos'}
        }
    }

}

export default JobsContext