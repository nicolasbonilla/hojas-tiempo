// aqui van las consultas sql
import mysql_method from "../db/mysql.js"

const promisePool = mysql_method.pool.promise()

const UserService ={

    'index_teams':async function(){

        return await promisePool.query("SELECT * FROM team")
        .then(([rows,fields])=>{
            return { "status": true, "teams": rows}
        }).catch((err)=>{
            console.log(err)
            return { "status": false }
        }
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    },
    "store_team": async function(req){

        const {} = req.body

        return await promisePool.query(
            'INSERT INTO team () VALUES (?)',
            []
        ).then(([ResultSetHeader])=>{
            return  { "status": true, "team":{ "team_id": ResultSetHeader.insertId,...req.body }}
        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    }
}

export default UserService
