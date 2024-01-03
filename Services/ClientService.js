// aqui van las consultas sql
import mysql_method from "../db/mysql.js"

const promisePool = mysql_method.pool.promise()

const UserService ={

    'index_clients':async function(req){

        return await promisePool.query("SELECT * FROM client")
        .then(([rows,fields])=>{
            return { "status": true, "clients": rows}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    },
    "store_client": async function(req){

        const {} = req.body

        return await promisePool.query(
            'INSERT INTO client () VALUES (?)',
            []
        ).then(([ResultSetHeader])=>{
            return  { "status": true, "client":{ "client_id": ResultSetHeader.insertId,...req.body }}
        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    }
}

export default UserService
