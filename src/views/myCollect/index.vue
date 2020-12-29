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
// import toast from '../../components/toast'
import auth from '../../utils/auth'
export default {
    name:'mycollect',
    components:{
        magazine,
        minetop,
        scroll
    },
    data(){
        return{
            userinfo: auth.getUser(),
            magboxStyle:{
                
            },
            magList:[
                
            ]
        }
    },
    methods:{
        readClick(mag_id){
            console.log(mag_id)
            this.$router.push('/magazine/detail/'+mag_id)
        },
        loadMyCollect(){
            let params = {
                tokens: auth.getToken()
            }
            this.$api.ucenter.getMyCollect(params).then(res => {
                if(res.code == 0){
                    this.magList = res.data
                }else{
                    console.log(res.message)
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
