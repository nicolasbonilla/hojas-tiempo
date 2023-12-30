import env from './env.js'

const Config = {

    'version': "1.0.0.0 29-12-2023 13:00",
    // development o production
    'status': 'development',

    /**
     * @param {String} key
     * @param {String} value
     */
    'get': function(key,value){

        if(this.status === 'development'){
            return env.development[key][value]
        }

        if (this.status === 'production'){
            return env.production[key][value]
        }
    }

}

export default Config