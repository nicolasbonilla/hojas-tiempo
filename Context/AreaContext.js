import AreaService from "../Services/AreaService.js"

export class Areas{

    static async indexAreas(req){
        return await AreaService.indexAreas(req)
    }

    static async storeArea(req){
        return await AreaService.storeArea(req)
    }

    static async updateArea(req){
        return await AreaService.updateArea(req)
    }

}
