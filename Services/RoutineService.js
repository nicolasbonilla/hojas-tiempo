// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const RoutineService ={

    "indexRoutinesRange": async function(params){
        const {date, user_id}  = params
        return await promisePool.query(
            'SELECT routine_id, start, end, routine FROM routine WHERE DATE(?) BETWEEN start AND end AND user_id = ?',[date,user_id]    
        ).then(([rows,fields])=>{
            return {"status":true,"routines":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false}
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
            return {"status":true,"routine":{"routine_id":ResultSetHeader.insertId, ...params}}
        }).catch((err)=>{
            console.log(err)
            return {"status":false}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    }
}

export default RoutineService
