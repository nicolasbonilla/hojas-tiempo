import mysql from 'mysql2'
import Config from '../config/index.js'

const method ={
    
    'pool' : mysql.createPool({
        'database': Config.get('database','database'),
        'user': Config.get('database','user'),
        'password': Config.get('database','password'),
        'host': Config.get('database','host'),
        'port': Config.get('database','port'),
        'waitForConnections': true,
        'connectionLimit': 10,
        'queueLimit': 0
    })
}

export default method
