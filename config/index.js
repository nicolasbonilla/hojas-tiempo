import env from './env.js'

const Config = {

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