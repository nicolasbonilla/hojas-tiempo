// aqui van las consultas sql
import mysql_method from "../db/mysql.js"


const promisePool = mysql_method.pool.promise()

const ReportService ={

    "indexReportXlsxRange": async function(params){
        const {start, end}  = params
        return await promisePool.query(
            `
                SELECT
                area.name AS Area,
                users.name AS Name,
                job_title.name AS Job_title,
                project.name AS Project,
                cost_center.name AS cost_center,
                activity.name AS Activity,
                CAST(COALESCE(SUM(hours),0)AS UNSIGNED) AS Total_hours,
                CAST(COALESCE((users.salary/180)* SUM(hours),0)AS DECIMAL(10,2)) AS Total
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
    }
}

export default ReportService
