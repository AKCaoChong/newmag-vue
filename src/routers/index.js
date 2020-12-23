import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../utils/auth'
import home from './home'
import kan from './kan'
import ucenter from './ucenter'
import login from './login'
import kanDetail from './kanDetail'
import address from './myAddress'
import myMag from './myMag'
import myCollect from './myCollect'
import codeList from './codeList'

Vue.use(VueRouter)


const routes = [
  home,kan,ucenter,login,kanDetail,address,myMag,myCollect,codeList,
  {
    path:'/magazine/search',
    component: () => import('../views/magSearch'),
    meta:{
      title: '搜索'
    },
    name:'search'
  },
  {
    path:'/*',
    redirect:'/home' //重定向一定要写到最下边
  },
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
    console.log(to)
  }
  
})

export default router
