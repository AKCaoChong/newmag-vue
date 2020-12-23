<template>
  <scroll class="container" :data="magList">
      <div class="content">
          <minetop :userinfo="userinfo"></minetop>
          <div class="mag-list">
            <magazine v-for="mag in magList" :key="mag.magazine_id" :mag="mag" @magClick="readClick(mag.magazine_id)" :magheight="magboxStyle.height" :magwidth="magboxStyle.width" style="marginBottom: 10px"></magazine>
          </div>
      </div>
  </scroll>
</template>

<script>
import scroll from '../../components/scroll'
import minetop from '../../components/mineTop'
import magazine from '../../components/magazine'
import toast from '../../components/toast'
export default {
    name:'mycollect',
    components:{
        magazine,
        minetop,
        scroll
    },
    data(){
        return{
            userinfo:{
                head:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLSrpu0ZJm6p3r89jvSzYowf0r0OM1Jliatr8uKrxUibpQRj81YF1YZSia4xXGckYaz34aOO0py45krg/132",
                name:"ZedLine"
            },
            magboxStyle:{
                
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
    methods:{
        readClick(mag_id){
            console.log(mag_id)
            this.$router.push('/magazine/detail/'+mag_id)
        },
        loadMyCollect(){
            this.$api.ucenter.getMyCollect().then(res => {
                if(res.code == 0){
                    this.magList = res.data
                }else{
                    toast({
                        text: res.message
                    })
                }
            })  
        }
    },
    created(){
        this.loadMyCollect()
    },
    mounted(){
        let width = document.documentElement.clientWidth;
        let magBoxW = (width - 30)/2
        let magImgH = magBoxW * 1.28;
        let magBoxH = magImgH + 60;
        this.magboxStyle = {
            width: magBoxW ,
            height: magBoxH 
        }
    }
}
</script>

<style scoped lang='scss'>
.container{
    bottom:0;
    .content{
        width: 100%;
        .mag-list{
            width: 100%;
            padding: 20px 10px 10px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between; 
        }
    }
}
</style>
