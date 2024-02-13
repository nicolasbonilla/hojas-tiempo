import AreaService from "../Services/AreaService.js"

export class Areas{

    static async indexAreas(req){

        const result = await AreaService.index_areas(req)
       
        if(result.status){
            return result
        }else{
            return {"status":false,"error":404,"message":"error en la consulta obtener areas"}
        }
    }

    static async storeArea(req){

        const result = await AreaService.store_area(req)
       
        if(result.status){
            return result
        }else{
            return {"status":false,"message":"error en la consulta al guardar area"}
        }
    }

    static async updateArea(req){

        const result =  await AreaService.update_area(req)
        if(result.status){
            return result
        }else{
            return {"status":false,"message":"error en la consulta actualizar area"}
        }
    }

}
