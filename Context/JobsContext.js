import JobService from "../Services/JobService.js"
export class Jobs{

    static async indexJobs(req){
        const result = await JobService.index_jobs(req)
       
        if(result.status){
            return result
        }else{
            return {message:'error en la consulta trabajos'}
        }
    }

}
