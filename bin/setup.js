#!/usr/bin/env node

    /**
     * Module dependencies.
     */
    import Config from '../config/index.js'
    import app from '../app.js'
    import debug from 'debug'//('node-express:server')
    import { createServer } from 'http'
    
    /**
     * Create HTTP server.
     */

    var server = createServer(app)

    /**
     * Listen on provided port, on all network interfaces.
     * After of call 'Config' declare status enviromnet 
    */
    
    if(Config.get('app','port') > 0){
        server.listen(Config.get('app','port'))
    }

    server.on('error', onError)
    server.on('listening', onListening)

    /**
     * Event listener for HTTP server "error" event.
    */
    function onError(error){
        if (error.syscall !== 'listen') {
          throw error
        }
        var bind = typeof port === 'string' ? 'Pipe ' +port : 'Port ' +port
        // handle specific listen errors with friendly messages
        switch (error.code){
            case 'EACCES':
                console.error(bind + ' requires elevated privileges')
                process.exit(1)
            break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use')
                process.exit(1)
            break;
            default:
            throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
    */
    function onListening() {
        let addr = server.address()
        let bind = typeof addr === 'string' ? 'pipe: '+addr : 'puerto: '+addr.port
        debug('>> AxonTime: iniciado en '+bind)
        console.info('>> AxonTime: iniciado en '+bind+' <<')
    }