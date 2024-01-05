// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const UserService ={

    'index_users':async function(req){

        return await promisePool.query("SELECT user_id,email,name,DATE_FORMAT(date_of_admission,'%Y/%m/%d') AS date_of_admission, work_days_id,salary,role_id,job_title_id,area_id,work_modality_id,location_id,status_id,active,phone_number,team_id, CASE TRUE WHEN TRUE THEN '' END AS password FROM users")
        .then(([rows,fields])=>{
            return { "status": true, "users": rows}
        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    },    
    'index_email':async function(req){

        const { email } = req.body
        return await promisePool.query(
        `
        SELECT 
        u.user_id,
        u.role_id,
        u.email,
        u.name,
        u.area_id,
        u.password,
        GROUP_CONCAT(roles_permission.permission_id) as permissions 
        FROM users u
        JOIN roles_permission
        ON u.email = ? AND u.role_id = roles_permission.role_id  
        `    
        ,[email])
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

        return await promisePool.query(
        `
        SELECT 
        u.user_id,
        u.role_id,
        u.email,
        u.name,
        u.area_id,
        GROUP_CONCAT(roles_permission.permission_id) as permissions 
        FROM users u
        JOIN roles_permission
        ON u.user_id = ? AND u.role_id = roles_permission.role_id 
        GROUP BY u.user_id
        `
        ,[user_id])
        .then(([rows,fields])=>{
            return { "status": true, "user": rows[0]}

        }).catch(
            console.log()
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    
    },
    "store": async function(req){

        const {email,name,date_of_admission,work_days_id,salary,role_id,job_title_id,area_id,work_modality_id,location_id,status_id,active,phone_number,team_id,password} = req.body

        return await promisePool.query(
            'INSERT INTO users (email,name,date_of_admission,work_days_id,salary,role_id,job_title_id,area_id,work_modality_id,location_id,status_id,active,phone_number,team_id,password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [email,name,date_of_admission,work_days_id,salary,role_id,job_title_id,area_id,work_modality_id,location_id,status_id,active,phone_number,team_id,password]
        ).then(([ResultSetHeader])=>{
            return  { "status": true, "user":{ "user_id": ResultSetHeader.insertId,...req.body }}
        }).catch(
            console.log()
        ).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },
    'update_full':async function(req){

        const {team_id, email, password, name, date_of_admission, work_days_id, salary, role_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, phone_number, user_id } = req.body
        return await promisePool.query("UPDATE users SET team_id = ?, email = ?, password = ?, name = ?, date_of_admission = ?, work_days_id = ?, salary = ?, role_id = ?, job_title_id = ?, area_id = ?, work_modality_id = ?, location_id = ?, status_id = ?, active = ?, phone_number = ? WHERE user_id = ?",
        [team_id, email, password, name, date_of_admission, work_days_id, salary, role_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, phone_number, user_id])
        .then(([ResultSetHeader])=>{
            return { "status": true, "ejecuciones": ResultSetHeader.affectedRows}
        }).catch(
            (err) => console.log(err)
        ).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    },
    'update':async function(req){

        const {team_id, email, name, date_of_admission, work_days_id, salary, role_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, phone_number, user_id } = req.body
        return await promisePool.query("UPDATE users SET team_id = ?, email = ?, name = ?, date_of_admission = ?, work_days_id = ?, salary = ?, role_id = ?, job_title_id = ?, area_id = ?, work_modality_id = ?, location_id = ?, status_id = ?, active = ?, phone_number = ? WHERE user_id = ?",
        [team_id, email, name, date_of_admission, work_days_id, salary, role_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, phone_number, user_id])
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

export default UserService
