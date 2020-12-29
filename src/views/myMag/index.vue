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
// import toast from '../../components/toast'
import auth from '../../utils/auth'
export default {
    name: 'mymag',
    data(){
        return {
            userinfo: auth.getUser(),
            magList:[
                
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
        console.log(this.userinfo)
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
            let params = {
                tokens: auth.getToken()
            }
            this.$api.ucenter.getMyMagazine(params).then(res => {
                console.log(res)
                if(res.code == 0){
                    this.magList = res.data
                }else{
                    console.log(res.message)
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
