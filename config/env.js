import dotenv from 'dotenv'
dotenv.config()

const Development = {
        'app':{
                "port": 3000,
                "urlsb":"", //url backend
                "urlsf":"" // url frontend
        },
        'database':{
                'host': "34.173.138.148",
                'port': "3306",
                'database': "hojas_tiempo",
                'user': "admin",
                'password': "admin"
        } 
}

const Production = {
        'app':{
                "port": process.env.PORT,// en producción dejar en 0 o configurar solo si es necesario
                "urlsb":"", // url backend
                "urlsf":"" // url frontend
        },
        'database':{
                'host': process.env.DB_HOST,
                'port': process.env.DB_PORT,
                'database': process.env.DB_NAME,
                'user': process.env.DB_USER,
                'password': process.env.DB_PASS
        } 
}

export default {'development': Development,'production':Production }