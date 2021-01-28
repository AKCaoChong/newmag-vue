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
import lazyLoad from './libs/directives/lazyLoad'

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
let img_url = 'https://zine.raylimobile.com/20210111103419.png';

shareTem({
  shareTitle: '《瑞丽电子刊》',
  shareDesc: store.state.share.shareDesc || '瑞丽电子刊',
  shareUrl: share_url,
  shareImg: img_url,
});

Vue.config.productionTip = false
Vue.prototype.$api = api
// Vue.prototype.$toast = toast
// Vue.use(toast)
// vue.use 会调用install 方法 wx5e6e1f3578f4cc03   wxa52fcc1c4cee1148
Vue.use(directive)  
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(auth,{
  appid:'wxa52fcc1c4cee1148',
  scope:'snsapi_userinfo'
})
Vue.use(lazyLoad,{
  default:''
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
