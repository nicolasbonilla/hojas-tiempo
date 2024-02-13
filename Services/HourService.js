// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const HourService ={

    "index_hours": async function(params){
        const {date, user_id}  = params
        return await promisePool.query(
            'SELECT *, DATE_FORMAT(date,"%Y-%m-%d") AS date FROM hours WHERE user_id = ? AND date = ?',[user_id, date]    
        ).then(([rows,fields])=>{
            return {"status":true,"hours":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    "index_hours_month": async function(params){
        const {date, user_id}  = params
        return await promisePool.query(
            'SELECT *,DATE_FORMAT(date,"%d") AS day, DATE_FORMAT(date,"%Y-%m-%d") AS date FROM hours WHERE DATE_FORMAT(date,"%Y-%m") = DATE_FORMAT(?,"%Y-%m") AND user_id = ?',[date,user_id]    
        ).then(([rows,fields])=>{
            return {"status":true,"hours":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status": false}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    "index_hours_between": async function(params){
        const {start, end}  = params
        return await promisePool.query(
            `
            SELECT CAST(COALESCE(SUM(hours.hours),0)AS UNSIGNED) AS total, users.user_id, users.area_id, users.name, users.team_id
            FROM users
            LEFT JOIN hours ON users.user_id = hours.user_id
            AND date BETWEEN ? AND ?
            GROUP BY users.user_id
            ORDER BY total ASC
            `
            ,[start,end]
        ).then(([rows,fields])=>{
            return {"status":true,"hours":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status": false}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    "store_hour": async function(params){
        const { project_id, activity_id, hours, date,comments,user_id } = params
        const _date = new Date(date)
        const day = _date.getUTCDate() || date.split("-")[2]
        return await promisePool.query(
            'INSERT INTO hours (project_id, activity_id, hours, date,comments,user_id) VALUES (?,?,?,?,?,?)',[project_id,activity_id,hours,date,comments,user_id]
        ).then(([ResultSetHeader])=>{
            return {"status":true,"hour":{"hours_id":ResultSetHeader.insertId, ...params,"day":day}}
        }).catch((err)=>{
            console.log(err)
            return {"status":false}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    'update_hour':async function(params){
        const {project_id, activity_id, hours, date, comments, user_id, hours_id} = params
        return await promisePool.query("UPDATE hours SET  project_id = ?, activity_id = ?, hours = ?, date = ?, comments = ?, user_id = ?  WHERE hours_id = ?",
        [project_id, activity_id,hours, date, comments, user_id, hours_id])
        .then(([ResultSetHeader])=>{
            return {"status":true,"executed":ResultSetHeader.affectedRows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false}
        }
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    },
    'delete_hour':async function(params){
        const { hours_id } = params
        return await promisePool.query(
            "DELETE FROM hours WHERE hours_id = ?",[hours_id]
        ).then(([ResultSetHeader])=>{
            return {"status":true,"executed":ResultSetHeader.affectedRows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    }
}

export default HourService
