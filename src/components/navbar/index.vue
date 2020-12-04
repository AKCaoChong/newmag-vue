<template>
  <header class="fix-nav-bar">
      <div class="left-item" @click="leftItemClick"><slot name="left"></slot></div>
      <div class="header-title">{{title}}</div>
      <div class="right-item" @click="rightItemClick"><slot name="right"></slot></div>
  </header>
</template>

<script>
export default {
    name:"nav-bar",
    props:{
        title:{
            type: String,
            default:''
        },
        bgColor:{
            type: String,
            default: '#ffffff'
        },
    },
    methods:{
        leftItemClick: function(){
            this.$emit('leftItemClick')
        },
        rightItemClick: function(){
            this.$emit('rightItemClick')
        }
    }
}
</script>

<style scoped lang="scss">
.fix-nav-bar{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 64px;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
    .left-item{
        margin-top: 24px;
        margin-left: 20px;
        width: 60px;
        height: 40px;
    }
    .header-title{
        width: 100%;
        height: 44px;
        margin-top: 24px;
        line-height: 44px;
        color: #333333;
        font-size: 16px;
        text-align: center;
    }
    .right-item{
        margin-top: 24px;
        margin-right: 20px;
        width: 60px;
        height: 40px;
    }
}
</style>