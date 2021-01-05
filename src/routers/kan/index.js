export default  {
    path: "/magazine",
    component: () => import('../../views/kan'),
    meta:{
        title:'电子刊',
        keepAlive: false
    },
    name:'magazine',
}