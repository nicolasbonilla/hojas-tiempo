// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const AreaService ={
 
    "store_area": async function(){
        return await promisePool.query(
            'INSERT INTO area (acronym, name, description, user_id) VALUES ("INX","Innovación","Innovation",1)'
            
        ).then(([ResultSetHeader])=>{

            return  { "status": true, "area":{ "area_id": ResultSetHeader.insertId }}

        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },

    'update_area':async function(req){

        const {acronym, name, description,user_id, area_id} = req.body
        return await promisePool.query("UPDATE area SET  acronym = ?, name = ?, description = ?, user_id = ?  WHERE area_id = ?",
        [acronym, name, description,user_id, area_id])
        .then(([rows,fields])=>{
            return { "status": true, "area": rows[0]}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
                // await promisePool.end()
            )

    }
}

export default AreaService
