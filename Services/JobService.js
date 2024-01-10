// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const JobService ={

    'index_jobs':async function(req){

        return await promisePool.query("SELECT * FROM job_title")
        .then(([rows,fields])=>{
            return { "status": true, "jobs": rows}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    }
}

export default JobService
