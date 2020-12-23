<template>
    <scroll class="container" :data="magList">
        <div class="content">
            <minetop :userinfo="userinfo"></minetop>
            <div class="mag-list">
                <maghor :magazine="mag" :ismy="true" v-for="mag in magList" :key="mag.magazine_id" @readCodeAction="readCodeClick" @readBeignAction="readBeginClick"></maghor>
            </div>
        </div>
    </scroll>
</template>

<script>
import maghor from '../../components/magazineMine'
import minetop from '../../components/mineTop'
import scroll from '../../components/scroll'
import toast from '../../components/toast'
export default {
    name: 'mymag',
    data(){
        return {
            userinfo:{
                headimg:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLSrpu0ZJm6p3r89jvSzYowf0r0OM1Jliatr8uKrxUibpQRj81YF1YZSia4xXGckYaz34aOO0py45krg/132",
                nickname:"ZedLine"
            },
            magList:[
                {
                    magazine_id:'1',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊",
                    type:"瑞丽家居设计",
                    all:'1',
                    notused:'0'
                },
                {
                    magazine_id:'12',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊",
                    type:"瑞丽家居设计",
                    all:'1',
                    notused:'0'
                },
                {
                    magazine_id:'4',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊",
                    type:"瑞丽家居设计",
                    all:'1',
                    notused:'0'
                },
                {
                    magazine_id:'122',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊",
                    type:"瑞丽家居设计",
                    all:'1',
                    notused:'0'
                }
            ]
        }
    },
    components:{
        maghor,
        minetop,
        scroll
    },
    created(){
        this.loadMyMagazine()
    },
    methods:{
        readCodeClick(mag){
            console.log(JSON.stringify(mag))
            this.$store.commit('ucenter/setminemag',JSON.stringify(mag))
            this.$router.push({name: 'codelist'})
        },
        readBeginClick(mag){
            console.log(mag)
        },
        loadMyMagazine(){
            this.$api.ucenter.getMyMagazine().then(res => {
                console.log(res)
                if(res.code == 0){
                    this.magList = res.data
                }else{
                    toast({
                        text: res.message
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang='scss'>
.container{
    bottom: 0;
    .content{
        width: 100%;
        .mag-list{
            width: 100%;
        }
    }
}
</style>
