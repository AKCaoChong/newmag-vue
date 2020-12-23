export default  {
    path:'/magazine/detail/:mag_id',
    component: () => import ("../../views/kanDetail"),
    props: true,
    meta:{
        title:'详情'
    },
    name:'magDetail',
    
}