export default  {
    path: "/",
    component: () => import('../../views/home'),
    meta:{
        title:'首页',
        requiredAuth: true
    },
    name:'home',
    children:[
        {
            path:'home',
            redirect:'/'
        }
    ]
}