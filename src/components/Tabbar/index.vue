<template>
  <div class="tabbar" :style="{paddingBottom: paddingBottom + 'px'}">
    <slot></slot>
  </div>
</template>

<script>

export default {
    name:'tabbar',
    props:{
        
    },
    data(){
        return{
            paddingBottom: 0
        }
    },
    mounted(){

    }
}
</script>

<style scoped lang="scss">
.tabbar{
    display: flex;
    text-align: center;
    height: 49px;
    background-color: #000000;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 5px;
    box-sizing: border-box;
    z-index: 10000;
}
</style>