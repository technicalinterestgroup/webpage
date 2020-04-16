import { Axios } from '@/config/http/interceptors'
// 引入字体图标
import '@/icons'
import '@/components'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)
Vue.prototype.$axios = Axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
