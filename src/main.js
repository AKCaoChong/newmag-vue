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
import shareTem from './utils/wxapi'
import VConsole from 'vconsole'
// 自定义指令
import directive from './libs/directives'


if(process.env.NODE_ENV == 'development'){
  let vConsole = new VConsole()
  Vue.use(vConsole)
  console.log(process.env.NODE_ENV)
}else{
  // let vConsole = new VConsole()
  // Vue.use(vConsole)
  // console.log(process.env.NODE_ENV)
}

let share_url = window.location.href.split("#")[0]		
let img_url = 'http://adsite8.rayligirl.com/mini/2020/dist/img/share.png';

shareTem({
  shareTitle: 'RayLiNewMagazine',
  shareDesc: 'RayLiNewMagazine',
  shareUrl: share_url,
  shareImg: img_url,
});

Vue.config.productionTip = false
Vue.prototype.$api = api
// Vue.prototype.$toast = toast
// Vue.use(toast)
// vue.use 会调用install 方法
Vue.use(directive)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(auth,{
  appid:'wxa52fcc1c4cee1148',
  scope:'snsapi_userinfo'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
