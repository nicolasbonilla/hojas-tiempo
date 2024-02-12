import JobService from "../Services/JobService.js"

const JobsContext ={

    "index_jobs":async(req)=>{

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