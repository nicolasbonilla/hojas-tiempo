// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const AreaService ={

    "indexAreas": async function(){
        return await promisePool.query(
            'SELECT * FROM area'
        ).then(([rows,fields])=>{
            return {"status":true,"areas":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false, "message":"error al consultar areas"}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },
    
    "storeArea": async function(){
        return await promisePool.query(
            'INSERT INTO area (acronym, name, description) VALUES ("INX","Innovación","Innovation")'
            
        ).then(([ResultSetHeader])=>{
            return {"status":true,"area":{"area_id": ResultSetHeader.insertId,"acronym":"INX","name":"Innovación","description":"Innovación" }}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al guardar un area"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    
    },

    'updateArea':async function(req){

        const {acronym, name, description, area_id} = req.body
        return await promisePool.query("UPDATE area SET  acronym = ?, name = ?, description = ? WHERE area_id = ?",
        [acronym, name, description, area_id])
        .then(([ResultSetHeader])=>{
            return {"status":true,"ejecuciones":ResultSetHeader.affectedRows}
        }).catch((err)=>{
            console.log(err)
            return{"status":false,"message":"error al actualizar un area"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    }
}

export default AreaService
