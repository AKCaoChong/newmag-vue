export default {
    path:'/ucenter/magazine',
    name:'myMag',
    component: () => import ('../../views/myMag'),
    meta:{
        title:'我的期刊',
        requiredAuth: false,
        keepAlive: false
    },
}