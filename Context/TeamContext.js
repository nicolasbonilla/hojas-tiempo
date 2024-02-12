import TeamService from "../Services/TeamService.js"

const TeamContext ={

    "index_teams":async(req)=>{

        const result = await TeamService.index_teams(req)
        if(result.status){
            return result
        }else{
            return {"error":404, "message":'error en la consulta equipos'}
        }
    },

    "store_team":async(req)=>{

    }

}

export default TeamContext