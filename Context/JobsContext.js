import JobService from "../Services/JobService.js"
export class Jobs{

    static async indexJobs(req){
        return await JobService.indexJobs(req)
    }

}
