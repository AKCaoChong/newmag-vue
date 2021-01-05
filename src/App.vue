<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    </transition>
    <tabbar v-if="this.$route.name == 'home' || this.$route.name == 'magazine' || this.$route.name == 'ucenter'">
      <tabbarItem  v-for="item in tabbarList" :key="item.text" :link="item.link" :normalColor="normalColor" :activeColor="activeColor">
        <img :src="item.normalImg" alt="" slot="item-icon">
        <img :src="item.activeImg" alt="" slot="item-icon-active">
        <div slot="item-text">{{item.text}}</div>
      </tabbarItem>
    </tabbar>
  </div>
</template>

<script>
import tabbar from './components/Tabbar/index'
import tabbarItem from './components/Tabbar/tabbarItem'
export default {
  name:"app",
  data(){
    return{
      normalColor:"#a7a7a7",
      activeColor:"#ffffff",
      tabbarList:[
        {
          link:"/home",
          normalImg:require("./assets/img/tabbar/home_normal.png"),
          activeImg:require("./assets/img/tabbar/home_sel.png"),
          text:"首页"
        },
        {
          link:"/magazine",
          normalImg:require("./assets/img/tabbar/kan_normal.png"),
          activeImg:require("./assets/img/tabbar/kan_sel.png"),
          text:"电子刊"
        },
        {
          link:"/ucenter",
          normalImg:require("./assets/img/tabbar/my_normal.png"),
          activeImg:require("./assets/img/tabbar/my_sel.png"),
          text:"我的"
        }
      ],
      transition:''
    }
  },
  components:{
    tabbar,
    tabbarItem
  },
  beforeRouteUpdate (to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  },
  created(){
    
    if (window.localStorage.getItem("minemag") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(window.localStorage.getItem("minemag"))))
    } 

    window.addEventListener("beforeunload",()=>{
      window.localStorage.setItem("minemag",JSON.stringify(this.$store.state))
    })
  },
}
</script>

<style lang="scss">
@import url("./assets/css/init.css");
html,body,#app{
  height: 100%;
  width: 100%;
}
.container{
  background-color: #ffffff;
  width: 100%;
  // height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 49px;
  // height: 100%;
  // overflow: scroll;
  // display: flex;
  // flex-direction: column;
  // box-sizing: border-box;
}

.fade-enter-active, .fade-leave-active{
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 250ms;
  position:absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
