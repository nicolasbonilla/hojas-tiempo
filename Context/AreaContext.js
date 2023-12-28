import UserService from "../Services/UserService.js"
import AreaService from "../Services/AreaService.js"
import utilities from "../utilities/index.js"

const AreaContext ={

    "index_areas":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await AreaService.index_areas(req)
       
        if(result.status){
            return {"areas":result.areas}
        }else{
            return {"error":404,message:'error en la consulta'}
        }
    },
    "store_area":async(req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }

        // se guarda el usuario nuevo
        const result = await AreaService.store_area(req)
       
        if(result.status){
            return {"area":result.area}
        }else{
            return {message:'error en la consulta'}
        }
    },
    "update_area":async (req)=>{

        // validar con jwt el usuario actual
        const check_user = utilities.jwt_check(req)
        if(!check_user.status){
            return check_user
        }
        const result =  await AreaService.update_area(req)
        if(result.status){
            return result
        }else{
            return {message:'error en la consulta'}
        }
    }

}

export default AreaContext