import dotenv from 'dotenv'
dotenv.config()

const Development = {
        'app':{
                "port": 8080,
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
                "port": 8080,
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

export default {'development': Development,'production':Production }