export default {
    path:'/ucenter/collect',
    name:'myCollect',
    component: () => import ('../../views/myCollect'),
    meta:{
        title:'我的收藏',
        requiredAuth: false,
        keepAlive: false
    },
}