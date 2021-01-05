export default{
    path:'/ucenter/magazine/codelist',
    component: () => import ('../../views/readCode'),
    name:'codelist',
    props: true,
    meta:{
        title: '我的阅读码',
        keepAlive: false
    }
}