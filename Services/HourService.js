// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const HourService ={

    "index_hours": async function(req){
        const {date, user_id}  = req.body
        return await promisePool.query(
            'SELECT *, DATE_FORMAT(date,"%Y-%m-%d") AS date FROM hours WHERE user_id = ? AND date = ?',[user_id, date]    
        ).then(([rows,fields])=>{
            return  { "status": true, "hours":rows}
        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    "index_hours_month": async function(req){
        const {date, user_id}  = req.body
        return await promisePool.query(
            'SELECT *, DATE_FORMAT(date,"%Y-%m-%d") AS date FROM hours WHERE DATE_FORMAT(date,"%Y-%m") = DATE_FORMAT(?,"%Y-%m") AND user_id = ?',[date,user_id]    
        ).then(([rows,fields])=>{
            return  { "status": true, "hours":rows}
        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    "store_hour": async function(params){
        const { project_id, activity_id, hours, date,comments,user_id } = params
        return await promisePool.query(
            'INSERT INTO hours (project_id, activity_id, hours, date,comments,user_id) VALUES (?,?,?,?,?,?)',[project_id,activity_id,hours,date,comments,user_id]
        ).then(([ResultSetHeader])=>{
            return  { "status": true, "hour":{ "hours_id": ResultSetHeader.insertId, ...params }}
        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    'update_hour':async function(req){
        const {project_id, activity_id, hours, date, comments, user_id, hours_id} = req.body
        return await promisePool.query("UPDATE hours SET  project_id = ?, activity_id = ?, hours = ?, date = ?, comments = ?, user_id = ?  WHERE hours_id = ?",
        [project_id, activity_id,hours, date, comments, user_id, hours_id])
        .then(([ResultSetHeader])=>{
            return { "status": true, "executed": ResultSetHeader.affectedRows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false}
        }
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    },
    'delete_hour':async function(req){
        const { hours_id } = req.body
        return await promisePool.query(
            "DELETE FROM hours WHERE hours_id = ?",[hours_id]
        ).then(([ResultSetHeader])=>{
            return { "status":true, "executed": ResultSetHeader.affectedRows }
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    }
}

export default HourService
