import { enumLetters } from "../enums/index.js"

const getConsecutiveLetter = (letter)=>{
    return (enumLetters.indexOf(letter) === (enumLetters.length-1)) ? enumLetters[0] : enumLetters[enumLetters.indexOf(letter)+1]
}

const validatorEmail = (string)=>{
    let evaluation = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);return evaluation.test(string.toLowerCase());
}

const Utilities = {

    validatorRequest:(body,array)=>{

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
                    if(!validatorEmail(body[array[index]])){
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

    },
    getNextLetterColumn:(letters)=>{
        if(letters.length === 1){
            
            if(enumLetters.indexOf(letters) < (enumLetters.length-1)){
                return getConsecutiveLetter(letters)
            }else{
                return `${getConsecutiveLetter(letters)}${getConsecutiveLetter(letters)}`
            }
        }else{
            // si la última letra es "z" se modifican las dos letras
            const _letters = letters.split("")
            let letter1 = _letters[0]
            let letter2 =  _letters[1]
            if(enumLetters.indexOf(_letters[1]) === (enumLetters.length-1)){
                letter1 = getConsecutiveLetter(letter1)
                letter2 = getConsecutiveLetter(letter2)
            }else{
                letter2 = getConsecutiveLetter(letter2)
            }
            return `${letter1}${letter2}`
        }
    }

}
export default Utilities
