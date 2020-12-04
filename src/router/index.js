import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import("../views/home")
const Magazine = () => import("../views/kan")
const Ucenter = () => import("../views/ucenter")
const routes = [
  {
    path:'/',
    redirect: "/home",
    meta:{
      title:'首页'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title:'首页'
    }
  },
  {
    path: '/magazine',
    name: 'Magazine',
    component: Magazine,
    meta:{
      title:'电子刊'
    }
  },
  {
    path: '/ucenter',
    name: 'Ucenter',
    component: Ucenter,
    meta:{
      title:'我的'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to,from,next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

export default router
