import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../utils/auth'
import home from './home'
import kan from './kan'
import ucenter from './ucenter'
import login from './login'
Vue.use(VueRouter)


const routes = [
  home,kan,ucenter,login
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to,from,next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  if(to.meta.requiredAuth && !auth.is_authed){
    next({
      name:'login',
      query:{
        "from": to.path
      }
    })
  }else{
    next()
  }
  
})

export default router
