export default  {
    path: "/magazine",
    component: () => import('../../views/kan'),
    meta:{
        title:'电子刊'
    },
    name:'magazine',
    children:[
        {
            path:'detail',
            component: () => import('../../views/kanDetail'),
            meta:{
                title:'详情'
            }
        }
    ]
}