<template>
  <scroll class="container" :data="addressList">
      <div class="content">
          <minetop :userinfo="userinfo"></minetop>
          <div class="address-list">
            <addressCell v-for="address in addressList" :key="address.id" :address="address"></addressCell>
          </div>
      </div>
  </scroll>
</template>

<script>
import scroll from '../../components/scroll'
import minetop from '../../components/mineTop'
import addressCell from '../../components/addressCell'
import toast from '../../components/toast'
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
                {
                    name:'王二小',
                    mobile:'18211159868',
                    province:'陕西省',
                    city:'西安市',
                    address:'咸阳区城门楼子下',
                    id:'1001'
                },
                {
                    name:'王二小',
                    mobile:'18211159868',
                    province:'陕西省',
                    city:'西安市',
                    address:'咸阳区城门楼子下',
                    id:'1002'
                },
                {
                    name:'王二小',
                    mobile:'18211159868',
                    province:'陕西省',
                    city:'西安市',
                    address:'咸阳区城门楼子下',
                    id:'1003'
                }
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
                    toast({
                        text: res.message
                    })
                }
            })
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
