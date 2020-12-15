export default{
    path:'/login',
    component: () => import('../../views/login'),
    name:'login',
    meta:{
        title: '登录'
    }
}