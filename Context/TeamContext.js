import TeamService from "../Services/TeamService.js"

export class Teams{

    static async indexTeams(req){

        const result = await TeamService.index_teams(req)
        if(result.status){
            return result
        }else{
            return {"error":404, "message":'error en la consulta equipos'}
        }
    }
        
}
