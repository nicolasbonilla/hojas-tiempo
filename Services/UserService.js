// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const UserService ={
    
    'index_email':async function(req){

        const { email } = req.body
        return await promisePool.query("SELECT user_id, email, password FROM users WHERE email = ?",[email])
        .then(([rows,fields])=>{
            return { "status": true, "user": rows[0]}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
             // await promisePool.end()
         )
    
    },


    'index_id':async function(user_id){

        return await promisePool.query("SELECT user_id, email FROM users WHERE user_id = ?",[user_id])
        .then(([rows,fields])=>{
            return { "status": true, "user": rows[0]}

        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
             // await promisePool.end()
         )
    
    },


    "store": async function(){
        return await promisePool.query(
            'INSERT INTO users VALUES ()',
            []
        ).then(([ResultSetHeader])=>{

            return  { "status": true, "user":{ "user_id": ResultSetHeader.insertId }}

        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },


    "store_project": async function(){
        return await promisePool.query(
            'INSERT INTO project VALUES ()',
            []
        ).then(([ResultSetHeader])=>{

            return  { "status": true, "project":{ "project_id": ResultSetHeader.insertId }}

        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },


    "store_activity": async function(){
        return await promisePool.query(
            'INSERT INTO activity VALUES ()',
            []
        ).then(([ResultSetHeader])=>{

            return  { "status": true, "activity":{ "activity_id": ResultSetHeader.insertId }}

        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },



    'update_full':async function(req){

        const {email, password, name, date_of_admission, work_days_id, salary, permission_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, user_id } = req.body
        return await promisePool.query("UPDATE users SET  email = ?, password = ?, name = ?, date_of_admission = ?, work_days_id = ?, salary = ?, permission_id = ?, job_title_id = ?, area_id = ?, work_modality_id = ?, location_id = ?, status_id = ?, active = ?  WHERE user_id = ?",
        [email, password, name, date_of_admission, work_days_id, salary, permission_id, job_title_id, area_id, work_modality_id, location_id, status_id,active,  user_id])
        .then(([rows,fields])=>{
            return { "status": true, "user": rows[0]}
        }).catch(
            (err) => console.log(err)
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    },

    'update':async function(req){

        const {email, name, date_of_admission, work_days_id, salary, permission_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, user_id } = req.body
        return await promisePool.query("UPDATE users SET  email = ?, name = ?, date_of_admission = ?, work_days_id = ?, salary = ?, permission_id = ?, job_title_id = ?, area_id = ?, work_modality_id = ?, location_id = ?, status_id = ?, active = ?  WHERE user_id = ?",
        [email, name, date_of_admission, work_days_id, salary, permission_id, job_title_id, area_id, work_modality_id, location_id, status_id,active,  user_id])
        .then(([rows,fields])=>{
            return { "status": true, "user": rows[0]}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
                // await promisePool.end()
            )

    },

    'update_project':async function(req){

        const {area_id, cost_center_id, name, client_id, project_status_id, project_id} = req.body
        return await promisePool.query("UPDATE project SET  area_id = ?, cost_center_id = ?, name = ?, client_id = ?, project_status_id = ?  WHERE project_id = ?",
        [area_id, cost_center_id, name, client_id, project_status_id, project_id])
        .then(([rows,fields])=>{
            return { "status": true, "user": rows[0]}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
                // await promisePool.end()
            )

    },

    'update_activity':async function(req){

        const {area_id, project_id, activity, user_id, activity_id} = req.body
        return await promisePool.query("UPDATE activity SET  area_id = ?, project_id = ?, activity = ?, user_id = ?  WHERE activity_id = ?",
        [area_id, project_id, activity, user_id, activity_id])
        .then(([rows,fields])=>{
            return { "status": true, "user": rows[0]}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
                // await promisePool.end()
            )

    }
}

export default UserService
