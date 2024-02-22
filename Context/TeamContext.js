import TeamService from "../Services/TeamService.js"

export class Teams{

    static async indexTeams(req){
        return await TeamService.indexTeams(req)
    }
        
}
