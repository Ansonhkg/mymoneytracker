import Vue from 'vue'

// This is your plugin object. It can be exported to be used anywhere.
const Helper = {
    install(vue, options){
        
        // --------- Numbers ---------
        Vue.prototype.$toFixed = (val, fixed) => {
            if(isNaN(val)) return
            var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
            return val.toString().match(re)[0];
        },

        // ---------- Downloadable ----------
        Vue.prototype.$downloadJsonAsFile = (jsonObject, filename) => {
            const data = JSON.stringify(jsonObject)
            const blob = new Blob([data], {type: 'text/plain'})
                  var today = new Date();
            const e = document.createEvent('MouseEvents'),
      
            a = document.createElement('a');
            a.download = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear() + "_" + filename + ".json";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e)
        }
        
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

                // TAB
                if(e.code == 'Tab'){
                    var array = Object.values(document.activeElement.classList)
                    
                    // console.log(.includes('row-description'))
                }

            };

            window.addEventListener('keyup', (e) => {handler(e, callback)}, true)
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