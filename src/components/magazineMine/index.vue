<template>
  <div class="mag-hor">
      <img :src="mag.logo" alt="" class="logo">
      <div class="right-group">
          <p class="mag-title">{{mag.main_title}}</p>
          <p class="mag type">{{mag.type}}</p>
          <p class="mag time">{{mag.sub_title}}</p>
          <p class="mag allnum" v-if="mag.all">数量:{{mag.all}}</p>
          <p class="mag hasnum" v-if="mag.notused">剩余:{{mag.notused}}</p>
          <div class="read" @click="readCodeClick(mag)" v-if="ismy && !hideread">阅读码</div>
          <div class="read" @click="readBeginClick(mag)" v-if="!ismy && !hideread">开始阅读</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'magMine',
    data(){
        return{
            mag: this.magazine
        }
    },
    props: {
        magazine: {
            type:Object,
            default:function(){
                return {}
            }
        },
        ismy: {
            type: Boolean,
            default: false
        },
        hideread: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        readCodeClick(mag){
            this.$emit('readCodeAction',mag)
        },  
        readBeginClick(mag){
            this.$emit('readBeignAction',mag)
        }
    }
}
</script>

<style scoped lang="scss">
.mag-hor{
    margin: 10px 15px;
    box-sizing: border-box;
    display: flex;
    background-color: #eeeeee;
    .logo{
        width: 160px;
        height: 205px;
    }
    .right-group{
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 10px 15px;
        box-sizing: border-box;
        .mag-title{
            font-size: 16px;
            color: #333333;
            font-weight: bold;
        }
        .mag{
            font-size: 14px;
            color: #aaaaaa;
        }
        .type{
            margin: 5px 0 ;
        }
        .allnum{
            margin: 10px 0 5px;
        }
        .read{
            height: 36px;
            width: 120px;
            line-height: 36px;
            text-align: center;
            margin: 15px auto 0;
            background-color: #c52e43;
            color: #ffffff;
            border-radius: 10px;
        }
    }
}
</style>