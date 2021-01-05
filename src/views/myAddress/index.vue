<template>
  <scroll class="container" :data="addressList">
      <div class="content">
          <minetop :userinfo="userinfo"></minetop>
          <div class="address-list">
            <addressCell v-for="address in addressList" :key="address.id" :address="address" @addressClick="addressAction(address)"></addressCell>
          </div>
      </div>
  </scroll>
</template>

<script>
import scroll from '../../components/scroll'
import minetop from '../../components/mineTop'
import addressCell from '../../components/addressCell'
// import toast from '../../components/toast'
import auth from '../../utils/auth'
export default {
    name:'myaddress',
    components:{
        scroll,
        minetop,
        addressCell
    },
    data(){
        return {
            addressList:[
            ],
            userinfo: auth.getUser(),
        }
    },
    methods:{
        loadMyAddress(){
            let params = {
                tokens: auth.getToken()
            }
            this.$api.ucenter.getMyAddress(params).then(res => {
                if(res.code == 0){
                    this.addressList = res.data
                }else{
                    console.log(res.message)
                }
            })
        },
        addressAction(addr){
            console.log('=====address====')
            console.log(addr)
            console.log('=====address====')
            if(this.$route.params.isSel){
                this.$store.commit('address/setSelAddress',addr)
                this.$router.back(-1)
            }
           
        }
    },
    created(){
        this.userinfo = auth.getUser()
        this.loadMyAddress()
    }
}
</script>

<style scoped lang="scss">
.container{
    bottom:0;
    .content{
        width: 100%;
        .address-list{
            width: 100%;
            padding: 20px 10px 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
