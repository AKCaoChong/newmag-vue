<template>
  <div class="container">
      <div class="search-group">
          <i class="iconfont icon-search"></i>
          <input type="text" class="search-group" placeholder="请输入搜索内容" :value="searchText" @keyup.enter="searchClick">
      </div>
      
  </div>
</template>

<script>
export default {
    name:"kan",
    data(){
        return{
            searchText: ''
        }
    },
    methods:{
        searchClick(){
            console.log(this.searchText)
        }
    },

}
</script>

<style scoped lang="scss">
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
</style>