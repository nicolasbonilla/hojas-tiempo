// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const HourService ={
 
    "store_hour": async function(){
        return await promisePool.query(
            'INSERT INTO hours (project_id, activity_id, hours, date,comments,user_id) VALUES (1,1,1,"2023/12/27","Total",1)'
            
        ).then(([ResultSetHeader])=>{

            return  { "status": true, "hour":{ "hours_id": ResultSetHeader.insertId }}

        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },

    'update_hour':async function(req){

        const {project_id, activity, hours, date, comments, user_id, hours_id} = req.body
        return await promisePool.query("UPDATE hours SET  project_id = ?, activity = ?, hours = ?, date = ?, comments = ?, user_id = ?  WHERE hours_id = ?",
        [project_id, activity,hours, date, comments, user_id, hours_id])
        .then(([rows,fields])=>{
            return { "status": true, "hour": rows[0]}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
                // await promisePool.end()
            )

    }
}

export default HourService
