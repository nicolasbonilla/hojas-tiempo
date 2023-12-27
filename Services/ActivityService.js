// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const ActivityService ={
 
    "store_activity": async function(){
        return await promisePool.query(
            'INSERT INTO activity (area_id, activity, user_id) VALUES (1,1,"actividad",1)'
            
        ).then(([ResultSetHeader])=>{

            return  { "status": true, "activity":{ "activity_id": ResultSetHeader.insertId }}

        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },

    'update_activity':async function(req){

        const {area_id, project_id, activity, user_id, activity_id} = req.body
        return await promisePool.query("UPDATE activity SET  area_id = ?, project_id = ?, activity = ?, user_id = ?  WHERE activity_id = ?",
        [area_id, project_id, activity, user_id, activity_id])
        .then(([rows,fields])=>{
            return { "status": true, "activity": rows[0]}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
                // await promisePool.end()
            )

    }
}

export default ActivityService
