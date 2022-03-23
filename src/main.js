import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CustomInput from './components/custom.vue'
import DForm from '../lib/index'
import '../lib/style/index.css'

Vue.use(ElementUI)
Vue.use(DForm,{components:[CustomInput]})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')