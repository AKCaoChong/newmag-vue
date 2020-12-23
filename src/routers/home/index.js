export default  {
    path: "/home",
    component: () => import('../../views/home'),
    meta:{
        title:'首页',
        requiredAuth: true
    },
    name:'home'
}