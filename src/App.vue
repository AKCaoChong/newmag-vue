<template>
  <div id="app">
     <router-view/>
    <tabbar>
      <tabbarItem v-for="item in tabbarList" :key="item.text" :link="item.link" :normalColor="normalColor" :activeColor="activeColor">
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
      activeColor:"#BC916B",
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
      ]
    }
  },
  components:{
    tabbar,
    tabbarItem
  }
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
</style>
