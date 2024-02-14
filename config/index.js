import env from './env.js'

const Config = {

    'version': "1.0.0.0 14-02-2024 12:09",
    // development o production
    'status': process.env.ENVIRONMENT || 'development',

    /**
     * @param {String} key
     * @param {String} value
     */
    'get': function(key,value){
        return env[this.status][key][value]
    }

}

export default Config