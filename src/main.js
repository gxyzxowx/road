import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'view-design'
import Loading from '@/components/loading/index.js'
import 'view-design/dist/styles/iview.css'
// 全局引入公共样式
import './assets/css/style.css'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

// 全局引用公共函数
import comFun from './assets/js/comfun.js'
// 全局引入rem
import './assets/js/rem.js'

// Vue.use(VueAxios, axios)
// Vue.prototype.$ajax = axios
Vue.prototype.comFun = comFun
Vue.use(iView)
Vue.use(Loading)

Vue.config.productionTip = false
// 全局设置消息提示的位置和持续时间
Vue.prototype.$Message.config({
  top: 300,
  duration: 3
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// export default vue
