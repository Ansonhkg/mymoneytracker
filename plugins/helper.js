import Vue from 'vue'

// This is your plugin object. It can be exported to be used anywhere.
const Helper = {
    install(Vue, options){
        
        // --------- Methods ---------
        Vue.prototype.$toFixed = (val, fixed) => {
            var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
            return val.toString().match(re)[0];
        },

        // --------- Validations ----------
        Vue.prototype.$number = (val) => {
            return (val <= 0 || val instanceof String) ? 0 : parseFloat(val)
        }

        // --------- Filters ---------
        Vue.filter('pound', (val) => "£" + val)
        
        Vue.filter('percent', (val) => val + "%")
    }
}

// Export it so we can use it later
export default Helper;

// Use it
Vue.use(Helper)