import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://191.252.218.168:2006/Light_API_Att/'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios.create({
            baseURL: 'http://191.252.218.168:2006/Light_API_Att/'
        })
    }
})