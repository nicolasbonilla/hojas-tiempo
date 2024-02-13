import AreaService from "../Services/AreaService.js"

export class Areas{

    static async indexAreas(req){

        const result = await AreaService.index_areas(req)
       
        if(result.status){
            return {"areas":result.areas}
        }else{
            return {"error":404,message:'error en la consulta'}
        }
    }

    static async storeArea(req){

        const result = await AreaService.store_area(req)
       
        if(result.status){
            return {"area":result.area}
        }else{
            return {message:'error en la consulta'}
        }
    }

    static async updateArea(req){

        const result =  await AreaService.update_area(req)
        if(result.status){
            return result
        }else{
            return {message:'error en la consulta'}
        }
    }

}
