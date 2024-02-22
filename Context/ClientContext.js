import ClientService from "../Services/ClientService.js"

export class Clients {
    
    static async indexClients(req){
        return await ClientService.indexClients(req)
    }

}
