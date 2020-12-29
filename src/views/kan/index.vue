<template>
  <scroll class="container" :data="maglist" pulldown pullup @pulldown="onPulldownRefresh" @scrollToEnd="onReachBottom"> 
      <div class="all-group">
        <div class="refresh-label" v-show = "isShowRefresh">下拉刷新</div>
        <div class="search-group" @click="searchClick">
            <i class="iconfont icon-search"></i>
            <p class="search-content">请输入搜索内容</p>
        </div>
        <scroll class="wrapper-tab" :data="tabList" :scrollX="true" :className="'tagscroll'">
            <ul class="tab-list">
                <li v-for="(tab, index) in tabList" :key="tab.id" @touchstart="tabClick(index)" :class="index == currentTab ? 'selStyle':''" :style="{ 'margin-left': (index==0 ? '0px':'20px' )}">{{tab.zinetype_name}}</li>
            </ul>
        </scroll>
        <div class="mag-list">
            <magazine v-for="mag in maglist" :key="mag.magazine_id" @magClick="readClick" :magheight="magboxStyle.height" :magwidth="magboxStyle.width" :mag="mag" style="margin-bottom:15px"></magazine>
        </div>
        <div class="loading-more" v-show = "isShowMore">加载更多</div>
      </div>
  </scroll>
</template>

<script>
import scroll from '../../components/scroll'
import magazine from '../../components/magazine'
// import toast from '../../components/toast'
export default {
    name:"kan",
    data(){
        return{
            searchText: '',
            currentTab: 0,
            zinetype_id: null,
            year: null,
            pagenum: 0,
            pagecount:10,
            isShowMore: false,
            isShowRefresh: false,
            tabList:[
                {
                    zinetype_id:'1',
                    zinetype_name:'全部'
                },
                {
                    zinetype_id:'2',
                    zinetype_name:'瑞丽服饰美容'
                },
                {
                    zinetype_id:'3',
                    zinetype_name:'伊人风尚'
                },
                {
                    zinetype_id:'4',
                    zinetype_name:'男人风尚'
                },
                {
                    zinetype_id:'5',
                    zinetype_name:'家居设计'
                },
                {
                    zinetype_id:'6',
                    zinetype_name:'筛选'
                },
            ],
            magboxStyle:{
                
            },
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
            this.$router.push('/magazine/search')
        },
        tabClick(index){
            console.log(index)
            this.currentTab = index
            if(index == 0){
                this.zinetype_id = null
            }else{
                this.zinetype_id = this.tabList[index].zinetype_id
            }
            this.loadMagList()
        },
        readClick(mag){
            console.log(mag)
            this.$router.push({ name: 'magDetail', params: { mag_id: mag }})
            // this.$router.push('/magazine/detail/'+mag)
        },
        loadMagList(){
            let params = {
                pagenum: this.pagenum,
                pagecount: this.pagecount,
                
            }
            if(this.zinetype_id){
                params.zinetype_id = this.zinetype_id
            }
            if(this.year){
                params.year = this.year
            }
            console.log(params)
            this.$api.magazine.getMagazineList(params).then(res => {
                console.log(res)
                if(res.code == 0){
                    if(this.pagenum == 0){
                        this.maglist = res.data
                    }else{
                        this.maglist.concat(res.data)

                    }
                    
                }else{
                    if(this.pagenum >0){
                        this.pagenum -= 1
                    }
                    
                }
            })
        },
        loadMagType(){
            this.$api.magazine.getMagazineType().then(res => {
                console.log(res)
                if(res.code == 0){
                    let all = {
                        zinetype_id: '1000',
                        zinetype_name: '全部'
                    }
                    res.data.unshift(all)
                    this.tabList = res.data
                }
            })
        },
        onPulldownRefresh(){
            console.log('load refresh')
            this.pagenum = 0
            this.loadMagList()
        },
        onReachBottom(){
            console.log('load more')
            this.pagenum+=1
            this.loadMagList()
        }
    },
    created(){
        this.loadMagList()
        this.loadMagType()
    },
    mounted(){
        let width = document.documentElement.clientWidth;
        let magBoxW = (width - 30)/2
        let magImgH = magBoxW * 1.28;
        let magBoxH = magImgH + 60;
        this.magboxStyle = {
            width: magBoxW ,
            height: magBoxH 
        }
    }

}
</script>

<style scoped lang="scss">
.all-group{
    padding-top: 10px;
    padding-bottom: 20px;
    position: relative;
    background-color: #ffffff;
    .refresh-label{
        position: absolute;
        top: -50px;
        left: 0;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        width: 100%;
    }
    .loading-more{
        position: absolute;
        bottom: -50px;
        left: 0;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        width: 100%;
    }
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
    .search-content{
        flex: 1;
        margin-left: 8px;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        color: #aaaaaa;
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
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
