import ClientService from "../Services/ClientService.js"

const ClientContext ={

    "index_clients":async(req)=>{

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