import Vue from 'vue'
import { callbackify } from 'util';

// This is your plugin object. It can be exported to be used anywhere.
const Helper = {
    install(Vue, options){
        
        // --------- Numbers ---------
        Vue.prototype.$toFixed = (val, fixed) => {
            if(isNaN(val)) return
            var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
            return val.toString().match(re)[0];
        },
        
        // --------- Local Storage ---------
        Vue.prototype.$getLocalStorageItem = (data) => {
            console.warn("Loaded data from local storage.")
            return localStorage.getItem(data) ? JSON.parse(localStorage.getItem(data)) : false
        }

        Vue.prototype.$setLocalStorageItem = (item, data) => {
            localStorage.setItem(item, JSON.stringify(data))
        }

        // ---------- Keyboard Events Handler ----------
        // Pass function as an argument 
        Vue.prototype.$mountKeyboardEventsHandler = (callback) => {

            var handler = (e, callback) => {
                var ctrl = (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)

                // Ctrl + S 
                // if (ctrl && e.keyCode == 83) {
                //     e.preventDefault();
                //     callback()
                // }
                
                callback()
            };

            window.addEventListener('keydown', (e) => {handler(e, callback)}, true)
        }

        // --------- Parser ----------
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