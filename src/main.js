import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import "lib-flexible"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import '@/assets/fonts/iconfont.css'
// 全局toast组件
// import toast from './components/toast'
import api from './libs/api'
import auth from './utils/auth'


Vue.config.productionTip = false
Vue.prototype.$api = api
// Vue.prototype.$toast = toast
// Vue.use(toast)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(auth,{
  appid:'wx5e6e1f3578f4cc03',
  scope:'snsapi_userinfo'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
