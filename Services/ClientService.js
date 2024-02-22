// aqui van las consultas sql
import mysql_method from "../db/mysql.js"

const promisePool = mysql_method.pool.promise()

const UserService ={

    'indexClients':async function(req){

        return await promisePool.query("SELECT * FROM client")
        .then(([rows,fields])=>{
            return {"status":true,"clients":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":'error al consultar clientes'}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    },
    "storeClient": async function(req){

        const {name,email} = req.body

        return await promisePool.query(
            'INSERT INTO client () VALUES (?)',
            []
        ).then(([ResultSetHeader])=>{
            return {"status":true,"client":{"client_id": ResultSetHeader.insertId,...req.body }}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":'error al guardar un cliente'}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    }
}

export default UserService
