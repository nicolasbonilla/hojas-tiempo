// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const ReportService ={

    "ReportXlsxRangeFull": async function(params){
        const {start, end}  = params
        
        return await promisePool.query(
            `
                SELECT
                area.acronym AS Area,
                users.ID,
                users.name AS Name,
                job_title.name AS Job_title,
                project.code AS Code,
                project.name AS Project,
                cost_center.name AS cost_center,
                activity.name AS Activity,
                CAST(COALESCE(SUM(hours),0) AS UNSIGNED) AS Total_hours
                FROM hours
                join users
                join project
                join area
                join activity
                join job_title
                join cost_center
                WHERE users.user_id = hours.user_id
                AND users.user_id = hours.user_id
                AND project.project_id = hours.project_id
                AND area.area_id = users.area_id
                AND hours.activity_id = activity.activity_id
                AND job_title.job_title_id = users.job_title_id
                AND cost_center.cost_center_id = project.cost_center_id
                AND hours.date >= ?
                AND hours.date <= ?
                GROUP BY users.user_id, hours.project_id, activity.name
                ORDER BY area.area_id, users.user_id
            `
            ,[start,end]    
        ).then(([rows,fields])=>{
            return {"status":true,"report":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al consultar reporte excel por rango"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    },
    "ReportXlsxRange": async function(params){
        const {start, end }  = params
        return await promisePool.query(
            `
            SELECT
            area.acronym AS Area,
            users.name AS Name,
            users.ID,
            CAST(COALESCE(MAX(users.user_id),0) AS UNSIGNED) AS UserId,
            job_title.name AS JobTitle,
            project.name AS Project,
            CAST(COALESCE(MAX(project.project_id),0) AS UNSIGNED) AS ProjectId,
            project.code AS Code,
            cost_center.name AS CostCenter,
            activity.name AS Activity,
            CAST(COALESCE(MAX(activity.activity_id),0) AS UNSIGNED) AS ActivityId,
            CAST(COALESCE(SUM(hours),0) AS UNSIGNED) AS Hours,
            CAST(COALESCE(MAX(salary.salary),0) AS UNSIGNED) AS Salary
        FROM hours
        JOIN users ON users.user_id = hours.user_id
        JOIN project ON project.project_id = hours.project_id
        JOIN area ON area.area_id = users.area_id
        JOIN activity ON hours.activity_id = activity.activity_id
        JOIN job_title ON job_title.job_title_id = users.job_title_id
        JOIN cost_center ON cost_center.cost_center_id = project.cost_center_id
        LEFT JOIN salary ON salary.user_id = users.user_id AND salary.date = ?
        WHERE hours.date >= ?
            AND hours.date <= ?
        GROUP BY users.user_id, hours.project_id, activity.name
        ORDER BY users.user_id
            `
            ,[start,start,end]    
        ).then(([rows,fields])=>{
            return {"status":true,"report":rows}
        }).catch((err)=>{
            console.log(err)
            return {"status":false,"message":"error al consultar reporte excel por rango"}
        }).finally(
            //solo si es necesario
            // await promisePool.end()
        )
    }
}

export default ReportService
