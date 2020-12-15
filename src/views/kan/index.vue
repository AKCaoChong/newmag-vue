<template>
  <scroll class="container" :data="maglist">
      <div class="all-group">
          <div class="search-group">
            <i class="iconfont icon-search"></i>
            <input type="text" class="search-group" placeholder="请输入搜索内容" :value="searchText" @keyup.enter="searchClick">
        </div>
        <scroll class="wrapper-tab" :data="tabList" :scrollX="true">
            <ul class="tab-list">
                <li v-for="(tab, index) in tabList" :key="tab.id" @touchstart="tabClick(index)" :class="index == currentTab ? 'selStyle':''" :style="{ 'margin-left': (index==0 ? '0px':'20px' )}">{{tab.title}}</li>
            </ul>
        </scroll>
        <div class="mag-list">
            <magazine v-for="mag in maglist" :key="mag.magazine_id" @magClick="readClick" :magwidth="magwidth" :mag="mag" style="margin-bottom:10px"></magazine>
        </div>
         <router-view></router-view>
      </div>
  </scroll>
</template>

<script>
import scroll from '../../components/scroll'
import magazine from '../../components/magazine'
export default {
    name:"kan",
    data(){
        return{
            magwidth: (document.documentElement.clientWidth- 30)/2,
            searchText: '',
            currentTab: 0,
            tabList:[
                {
                    id:'1',
                    title:'全部'
                },
                {
                    id:'2',
                    title:'瑞丽服饰美容'
                },
                {
                    id:'3',
                    title:'伊人风尚'
                },
                {
                    id:'4',
                    title:'男人风尚'
                },
                {
                    id:'5',
                    title:'家居设计'
                },
                {
                    id:'6',
                    title:'筛选'
                },
            ],
            maglist:[
                {
                    magazine_id:'1',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                },
                {
                    magazine_id:'12',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                },
                {
                    magazine_id:'4',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                },
                {
                    magazine_id:'122',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                },
                {
                    magazine_id:'40',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                },
                {
                    magazine_id:'1202',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                }
            ],
        }
    },
    components:{
        scroll,
        magazine
    },
    methods:{
        searchClick(){
            console.log(this.searchText)
        },
        tabClick(index){
            this.currentTab = index
        },
        readClick(mag){
            console.log(mag)
            this.$router.push('magazine/detail')
        }
    },

}
</script>

<style scoped lang="scss">
.all-group{
    padding-top: 10px;
}
.search-group{
    margin: 10px;
    display: flex;
    align-items: center;
    background-color: #eeeeee;
    border-radius: 6px;
    padding-left: 10px;
    i{

    }
    input{
        flex: 1;
        border: none;
        background-color: #eeeeee;
        font-size: 16px;
        height: 36px;
        margin: 0;
        outline: 0;
        // padding-left: 10px;
    }
}
 $tabHeight: 48px;
.wrapper-tab{
    margin: 0 10px;
    height: $tabHeight;
    background-color: #ffffff;
    overflow: hidden;
    ul{
        display: block;
        list-style: none;
        height: $tabHeight;
        white-space:nowrap;
        display: inline-block; //ul 默认为block  如果想宽度被自动撑开 inline-block
        li{
            display: inline-block;
            line-height: $tabHeight;
            height: $tabHeight;
            font-size: 16px;
            box-sizing: border-box;
        }
        .selStyle{
            border-bottom: 2px solid #C52E43;
            // font-size: 18px;
        }
    }
}
.mag-list{
    margin: 20px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
