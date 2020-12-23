<template>
  <div class="user-info">
      <img :src="user.headimg" alt="" class="header">
      <p class="nick-name">{{user.nickname}}</p>
  </div>
</template>

<script>
export default {
    name:'minetop',
    props:{
        userinfo:{
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    data(){
        return{
            user: this.userinfo
        }
    }
}
</script>

<style scoped lang="scss">
.user-info{
    width: 100%;
    height: 100px;
    background: linear-gradient(#ffffff,#aaaaaa);
    display: flex;
    align-items: center;
    .header{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 2px #ffffff solid;
        margin-left: 20px;
    }
    .nick-name{
        margin-left: 15px;
        font-size: 16px;
        color: #333333;
        font-weight: bold;
    }
}
</style>

