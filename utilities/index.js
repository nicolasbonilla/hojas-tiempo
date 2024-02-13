const utilities = {

    'validatorEmail': function(string){
        let evaluation = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);return evaluation.test(string.toLowerCase());
    },
    
    'validatorRequest': function(body,array){

        let bool_body = body ? true : false
        
        let validator_status = true
        let validator_parameters = []
        let error = 200
        // body es un objeto?
        if(!bool_body || typeof body !== 'object'){
            return {"error": 400,"status": false, "parameters": validator_parameters }
        }

        //recorrido y validacion de variables
        for (let index = 0; index < array.length; index++) {

            switch ( array[index] ){
                
                // validación de parametros con formato especial, email, name, o los que desee personalizar
                case 'email':
                    if(!this.validatorEmail(body[array[index]])){
                        validator_status = false
                        validator_parameters.push(array[index])
                        error = 400
                    } 
                break;

                // validación si existe el parametro independiente de si el formato es correcto
                default:
                    let bool_exist = body[array[index]] != undefined ? true : false
                    if(!bool_exist){
                        validator_status = false
                        validator_parameters.push(array[index])
                        error = 400
                    }
                break;
            }

        }

        return {"error":error, "status": validator_status, "parameters": validator_parameters}

    }

}
export default utilities
