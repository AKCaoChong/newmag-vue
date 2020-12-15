<template>
  <div class="cell" @click="cellClick">
      <div class="cell-title"> <slot name="icon"></slot> {{title}}</div>
      <div class="cell-right"><img src="@/assets/img/address_right.png" alt=""></div>
  </div>
</template>

<script>
export default {
    name:"cell",
    props:{
        title:{
            type: String,
            default: ""
        }
    },
    methods:{
        cellClick: function(){
            this.$emit('cellAction',{})
        }
    }
}
</script>

<style lang="scss" scoped>
.cell{
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 48px;
    height: 48px;
    .cell-title{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        img{
            margin-right: 10px;
            width: 30px;
            height: 30px;
        }
    }
    .cell-right{
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 20px;
            height: 30px;

        }
    }
}
</style>