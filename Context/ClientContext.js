import ClientService from "../Services/ClientService.js"
import utilities from "../utilities/index.js"

const ClientContext ={

    "index_clients":async(req)=>{

        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        const result = await ClientService.index_clients(req)
        if(result.status){
            return result
        }else{
            return {"error":404, "message":'error en la consulta clientes'}
        }
    },

    "store_client":async(req)=>{

    }

}

export default ClientContext