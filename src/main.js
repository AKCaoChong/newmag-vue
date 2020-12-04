import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "lib-flexible"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import '@/assets/fonts/iconfont.css'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
