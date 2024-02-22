// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const ActivityService ={

    "indexActivities": async function(){
        return await promisePool.query(
            'SELECT * FROM activity'
        ).then(([rows,fields])=>{
            return {"status":true,"activities":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al consultar actividades"}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },
    
    "storeActivity": async function(params){

        const { area_id,name } = params

        return await promisePool.query(
            'INSERT INTO activity (area_id, name) VALUES (?,?)',[area_id,name]            
        ).then(([ResultSetHeader])=>{
            return {"status":true,"activity":{"activity_id": ResultSetHeader.insertId,"area_id":area_id,"name": name }}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al guardar una actividad"}
        }
        ).finally(
           //solo si es necesario
           // await promisePool.end()
        )
    
    },

    'updateActivity':async function(params){

        const {area_id, name, activity_id} = params
        return await promisePool.query("UPDATE activity SET  area_id = ?, name = ? WHERE activity_id = ?",
        [area_id, name, activity_id])
        .then(([ResultSetHeader])=>{
            return {"status":true,"ejecuciones":ResultSetHeader.affectedRows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al actualizar actividad"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    }
}

export default ActivityService
