// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const ProjectService ={

    "indexProjects": async function(){
        return await promisePool.query(
            'SELECT * FROM project'
        ).then(([rows,fields])=>{
            return {"status":true,"projects":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al consultar proyectos"}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },
    "storeProject": async function(params){
        const { user_id, name, code } = params
        return await promisePool.query(
            'INSERT INTO project (area_id, cost_center_id, name, code, client_id, project_status_id, user_id) VALUES ( 1, 1, ?,?, 1, 1,?)',[name,code,user_id]
        ).then(([ResultSetHeader])=>{
            return {"status":true,"project":{"project_id":ResultSetHeader.insertId, ...params }}
        }).catch((err)=>{
            console.log(err)
            return {"status":false, "message":"error al guardar un proyecto"}
        }
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },
    'updateProject':async function(params){

        const {area_id, cost_center_id, name, code, client_id, project_status_id, user_id, project_id } = params
        return await promisePool.query("UPDATE project SET  area_id = ?, cost_center_id = ?, name = ?, code = ?, client_id = ?, project_status_id = ?, user_id = ? WHERE project_id = ?",
        [area_id, cost_center_id, name, code, client_id, project_status_id, user_id, project_id])
        .then(([ResultSetHeader])=>{
            return {"status":true,"ejecuciones":ResultSetHeader.affectedRows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al actualizar un proyecto"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    }

}

export default ProjectService
