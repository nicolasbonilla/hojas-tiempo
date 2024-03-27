// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const UserService ={

    'indexUsers':async function(){

        return await promisePool.query("SELECT user_id,email,ID,name,DATE_FORMAT(date_of_admission,'%Y/%m/%d') AS date_of_admission, work_days_id,salary,role_id,job_title_id,area_id,work_modality_id,location_id,status_id,active,phone_number,team_id, CASE TRUE WHEN TRUE THEN '' END AS password FROM users")
        .then(([rows,fields])=>{
            return {"status":true,"users":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error en la consulta usuarios"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    },    
    'indexEmail':async function(params){

        const { email } = params
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
            return {"status":true,"user":rows[0]}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"usuario no encontrado"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    },
    'indexId':async function(params){

        const { user_id } = params

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
            return {"status":true,"user":rows[0]}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"usuario no encontrado"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    
    },
    "storeUser": async function(params){

        const {email,name,date_of_admission,work_days_id,salary,role_id,job_title_id,area_id,work_modality_id,location_id,status_id,active,phone_number,team_id,password,ID} = params

        return await promisePool.query(
            'INSERT INTO users (email,name,date_of_admission,work_days_id,salary,role_id,job_title_id,area_id,work_modality_id,location_id,status_id,active,phone_number,team_id,password,ID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [email,name,date_of_admission,work_days_id,salary,role_id,job_title_id,area_id,work_modality_id,location_id,status_id,active,phone_number,team_id,password,ID]
        ).then(([ResultSetHeader])=>{
            return {"status":true,"user":{"user_id": ResultSetHeader.insertId,...params }}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error en consulta al guardar usuario"}
        }).finally(
           //solo si es necesario
            // await promisePool.end()
        )
    
    },
    'updateFull':async function(params){

        const {team_id, email, password, name, date_of_admission, work_days_id, salary, role_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, phone_number, ID, user_id } = params
        // el parametro user_id siempre debe estará de último en el array
        return await promisePool.query("UPDATE users SET team_id = ?, email = ?, password = ?, name = ?, date_of_admission = ?, work_days_id = ?, salary = ?, role_id = ?, job_title_id = ?, area_id = ?, work_modality_id = ?, location_id = ?, status_id = ?, active = ?, phone_number = ?, ID = ? WHERE user_id = ?",
        [team_id, email, password, name, date_of_admission, work_days_id, salary, role_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, phone_number, ID, user_id])
        .then(([ResultSetHeader])=>{
            return {"status":true,"ejecuciones": ResultSetHeader.affectedRows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error en la consulta actualizar usuario completo"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    },
    'update':async function(params){

        const {team_id, email, name, date_of_admission, work_days_id, salary, role_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, phone_number, ID,user_id } = params
        // el parametro user_id siempre debe estará de último en el array
        return await promisePool.query("UPDATE users SET team_id = ?, email = ?, name = ?, date_of_admission = ?, work_days_id = ?, salary = ?, role_id = ?, job_title_id = ?, area_id = ?, work_modality_id = ?, location_id = ?, status_id = ?, active = ?, phone_number = ?, ID = ? WHERE user_id = ?",
        [team_id, email, name, date_of_admission, work_days_id, salary, role_id, job_title_id, area_id, work_modality_id, location_id, status_id, active, phone_number, ID,user_id])
        .then(([ResultSetHeader])=>{
            return {"status":true,"ejecuciones":ResultSetHeader.affectedRows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error en la consulta actualizar usuario"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )

    }
}

export default UserService
