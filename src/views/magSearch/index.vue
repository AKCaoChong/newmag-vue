<template>
  <scroll class="container" :data="magList">
      <div class="content">
        <div class="search-group">
            <div class="search-arr">
                <i class="iconfont icon-search"></i>
                <input type="text" class="search-text" placeholder="请输入杂志名" @input="inputChange" v-model="searchText">
            </div>
            <div class="sousou" @click="getSearchMag">搜索</div>
        </div>
        <div class="hot-search">
            <h3>热门搜索</h3>
            <div class="hot-tags">
                <p class="item-text" v-for="tag in tags" :key="tag.magazine_id" @click="itemTagClick(tag.keyword)">{{tag.keyword}}</p>
            </div>
        </div>
        <div class="mag-list">
            <maghor :magazine="mag" :ismy="false" :hideread='true' v-for="mag in magList" :key="mag.magazine_id" @readBeignAction="readBeginClick"></maghor>
        </div>
      </div>
  </scroll>
</template>

<script>
import scroll from '../../components/scroll'
import maghor from '../../components/magazineMine'
export default {
    name:'search',
    data(){
        return{
            searchText:'',
            tags:[
                
            ],
            currentTagItem:0,
            magList:[
                
            ]
        }
    },
    created(){
        this.loadSearchTags()
    },
    methods:{
        debounce(func,delay){
            let timer = null,
            that = this
            return function(){
                if(timer){
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    func.apply(that)
                }, delay);
            }
        },
        throttle(func,delay){
            let pre = 0
            let that = this
            return function(){
                let now = Date.now()
                if(now - pre > delay){
                    func.apply(that)
                    pre = now
                }
            }
        },
        inputChange(){
           this.throttle(this.getSearchMag,1000)
        },
        itemTagClick(keyword){
            this.searchText = keyword
            this.getSearchMag()
        },
        getSearchMag(){
            let params = {
                key: this.searchText
            }
            this.$api.magazine.searchMagazine(params).then(res => {
                console.log(res)
                if(res.code == 0){
                    this.magList = res.data
                }else{
                    console.log('helo')
                }
            })
        },
        loadSearchTags(){
            this.$api.magazine.getSearchTagList().then(res => {
                console.log(res)
                if(res.code == 0){
                    this.tags = res.data
                }else{
                    console.log('helo')
                }
            })
        },
        readBeginClick(mag){
            console.log(mag)
            this.$router.push({ name: 'magDetail', params: { mag_id: mag.magazine_id }})
        },
    },
    components:{
        scroll,
        maghor
    }
}
</script>

<style scoped lang="scss">
.container{
    bottom: 0;
    .content{
        padding-top: 10px;
        .search-group{
            width: 100%;
            padding: 5px 10px;
            box-sizing: border-box;
            background-color: #ffffff;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 44px;
            .search-arr{
                display: flex;
                align-items: center;
                flex: 1;
                height: 100%;
                background-color: #eeeeee;
                border-radius: 5px;
                overflow: hidden;
                .icon-search{
                    margin: 8px;
                    margin-top: 10px;
                }
                input{
                    flex: 1;
                    height: 100%;
                    color: #333333;
                    line-height: 100%;
                    border: none;
                    font-size: 16px;
                    background-color: #eeeeee;
                }
            }
            .sousou{
                background-color: #ffffff;
                margin-left: 10px;
                font-size: 16px;
                color: #333333;
                width: 50px;
                height: 36px;
                line-height: 36px;
                text-align: center;
            }
        }
        .hot-search{
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            .hot-tags{
                margin-top: 10px;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .item-text{
                    background-color: #f6f6f6;
                    color: #353535;
                    padding: 5px 10px;
                    font-size: 14px;
                    text-align: center;
                    border-radius: 10px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            }
        }
    }
    
}
</style>