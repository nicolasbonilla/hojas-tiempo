import TeamService from "../Services/TeamService.js"
import utilities from "../utilities/index.js"

const TeamContext ={

    "index_teams":async(req)=>{

        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

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