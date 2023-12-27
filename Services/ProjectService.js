// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const ProjectService ={

    "index_projects": async function(){
        return await promisePool.query(
            'SELECT * FROM project'
        ).then(([rows,fields])=>{
            return  { "status": true, "projects": rows }
        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },

    "store_project": async function(){
        return await promisePool.query(
            'INSERT INTO project (area_id, cost_center_id, name, code, client_id, project_status_id) VALUES ( 1, 1, "Proyecto","code", 1, 1)'
        ).then(([ResultSetHeader])=>{

            return  { "status": true, "project":{ "project_id": ResultSetHeader.insertId, "name":"Proyecto","area_id": 1,"cost_center_id":1,"client_id": 1,"project_status_id":1 }}

        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },

    'update_project':async function(req){

        const {area_id, cost_center_id, name, code, client_id, project_status_id, project_id} = req.body
        return await promisePool.query("UPDATE project SET  area_id = ?, cost_center_id = ?, name = ?, code = ?, client_id = ?, project_status_id = ?  WHERE project_id = ?",
        [area_id, cost_center_id, name, code, client_id, project_status_id, project_id])
        .then(([ResultSetHeader])=>{
            return { "status": true, "ejecuciones": ResultSetHeader.affectedRows}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
                // await promisePool.end()
            )

    }
}

export default ProjectService
