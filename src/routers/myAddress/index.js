export default  {
    path: "/ucenter/address",
    component: () => import('../../views/myAddress'),
    meta:{
        title:'我的地址',
        requiredAuth: false,
        keepAlive: false
    },
    name:'address'
}