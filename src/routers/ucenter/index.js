export default  {
    path: "/ucenter",
    component: () => import('../../views/ucenter'),
    meta:{
        title:'我的',
        keepAlive: false
    },
    name:'ucenter'
}