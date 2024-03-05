// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const RoutineService ={
    
    "indexRoutinesUser": async function(params){
        const { user_id }  = params
        return await promisePool.query(
            'SELECT * FROM routine WHERE user_id = ?',[user_id]
        ).then(([rows,fields])=>{
            return {"status":true,"routines":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al consultar rutinas por usuario"}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    "indexRoutinesRange": async function(params){
        const {date, user_id}  = params
        return await promisePool.query(
            'SELECT routine_id, start, end, routine FROM routine WHERE DATE(?) BETWEEN start AND end AND user_id = ?',[date,user_id]    
        ).then(([rows,fields])=>{
            return {"status":true,"routines":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al consultar rutinas por rango de tiempo y usuario"}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    "indexRoutinesRangeMonth": async function(params){
        const {start,end,user_id}  = params

        return await promisePool.query(
            'SELECT routine_id, DATE_FORMAT(start,"%Y-%m-%d") AS start, DATE_FORMAT(end,"%Y-%m-%d") AS end, routine FROM routine WHERE ((end >= ? AND start <= ?) OR (start >= ? AND end <= ?)) and user_id = ?',[start,end,start,end,user_id]
        ).then(([rows,fields])=>{
            return {"status":true,"routines":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al consultar rutinas por rango de mes y usuario"}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    "storeRoutine": async function(params){
        
        const { start, end, routine, user_id } = params

        return await promisePool.query(
            'INSERT INTO routine (start, end, routine,user_id) VALUES (?,?,?,?)',[start,end,JSON.stringify(routine),user_id]
        ).then(([ResultSetHeader])=>{
            return {"status":true,"routine":{"routine_id":ResultSetHeader.insertId,"start":start,"end":end,"routine":routine}}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,message:"error al guardar una rutina"}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    },
    "deleteRoutine": async function(params){
        
        const { routine_id, user_id } = params
        return await promisePool.query(
            "DELETE FROM routine WHERE routine_id = ? AND user_id = ?",[routine_id,user_id]
        ).then(([ResultSetHeader])=>{
            return {"status":true,"executed":ResultSetHeader.affectedRows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al eliminar una rutina"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    }
}

export default RoutineService
