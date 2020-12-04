<template>
  <div class="tabbar-item" @click="itemClick">
      <template v-if="isActive"><slot name="item-icon-active"></slot></template>
      <template v-else> <slot name="item-icon"></slot> </template>
      <div class="item-text" :style="textStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
    name:'tabbarItem',
    data(){
        return{

        }
    },
    props:{
        link: String,
        activeColor:{
            type: String,
            default: "red"
        },
        normalColor:{
            type: String,
            default: "#cccccc"
        },
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.link) !== -1;
        },
        textStyle(){
            return this.isActive ? {color: this.activeColor} : {color: this.normalColor}
        }
    },
    methods:{
        itemClick(){
            this.$router.push(this.link)
        }
    }
}
</script>

<style scoped lang="scss">
.tabbar-item{
    flex: 1;
    font-size: 14px;
}

.tabbar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
}
</style>