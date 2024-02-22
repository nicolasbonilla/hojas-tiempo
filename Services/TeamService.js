// aqui van las consultas sql
import mysql_method from "../db/mysql.js"

const promisePool = mysql_method.pool.promise()

const UserService ={

    'indexTeams':async function(){

        return await promisePool.query("SELECT * FROM team")
        .then(([rows,fields])=>{
            return {"status":true,"teams":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al consultar equipos"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    },
    "storeTeam": async function(req){

        const {} = req.body

        return await promisePool.query(
            'INSERT INTO team () VALUES (?)',
            []
        ).then(([ResultSetHeader])=>{
            return {"status":true,"team":{"team_id":ResultSetHeader.insertId,...req.body }}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al guardar un equipo"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    
    }
}

export default UserService
