// aqui van las consultas sql
import mysql_method from "../db/mysql.js"

const promisePool = mysql_method.pool.promise()

const PermissionService ={

    'index_role_id':async function(req){

        const { role_id } = req.body

        return await promisePool.query("SELECT * FROM permissions WHERE role_id = ?",[role_id])
        .then(([rows,fields])=>{
            return { "status": true, "permissions": rows}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    }
}

export default PermissionService
