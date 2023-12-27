// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const ActivityService ={

    "index_activities": async function(){
        return await promisePool.query(
            'SELECT * FROM activity'
        ).then(([rows,fields])=>{
            return  { "status":true, "activities":rows}
        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },
    
    "store_activity": async function(){
        return await promisePool.query(
            'INSERT INTO activity (area_id, name) VALUES (1,"actividad")'
            
        ).then(([ResultSetHeader])=>{

            return  { "status": true, "activity":{ "activity_id": ResultSetHeader.insertId,"area_id":1,"name":"Actividad" }}

        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },

    'update_activity':async function(req){

        const {area_id, name, activity_id} = req.body
        return await promisePool.query("UPDATE activity SET  area_id = ?, name = ? WHERE activity_id = ?",
        [area_id, name, activity_id])
        .then(([ResultSetHeader])=>{
            return {"status": true,"ejecuciones":ResultSetHeader.affectedRows}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
                // await promisePool.end()
            )

    }
}

export default ActivityService
