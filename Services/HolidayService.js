// aqui van las consultas sql
import mysql_method from "../db/mysql.js"

const promisePool = mysql_method.pool.promise()

const Service ={

    'indexHolidays':async function(date){
        return await promisePool.query("SELECT festivo_id, DATE_FORMAT(date,'%Y-%m-%d') AS date FROM festivos WHERE DATE_FORMAT(date,'%Y') = DATE_FORMAT(?,'%Y')",[date])
        .then(([rows,fields])=>{
            return {"status":true,"holidays":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error en la consulta de festivos"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    }
}

export default Service
