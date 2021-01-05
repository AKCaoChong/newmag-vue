<template>
  <div class="address-group" @click="addressClick()">
      <p class="name-mobile">{{address.name}} {{address.mobile}}</p>
      <p class="address">{{address.province}}{{address.city}}{{address.district}}{{address.address}}</p>
  </div>
</template>

<script>
export default {
    name:'addressCell',
    props:{
        address:{
            type: Object,
            default:function(){
                return {}
            }
        }
    },
    methods:{
        addressClick(){
            console.log('=====addressaaa====')
            console.log(this.address)
            console.log('=====addressaaaa====')
            this.$emit('addressClick',this.address)
        }
    }

}
</script>

<style scoped lang='scss'>
.address-group{
    background-color: #eeeeee;
    color: #333333;
    font-size: 16px;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    p{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        // padding: 5px;
    }   
}
</style>