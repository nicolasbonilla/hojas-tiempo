import ClientService from "../Services/ClientService.js"

export class Clients {
    
    static async indexClients(req){
        const result = await ClientService.index_clients(req)
        if(result.status){
            return result
        }else{
            return {"error":404, "message":'error en la consulta clientes'}
        }
    }

}
