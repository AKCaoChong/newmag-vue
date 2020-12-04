<template>
  <div class="mag-group" @click="magClick(mag.magazine_id)">
      <img :src="mag.logo" alt="">
      <p class="title">{{mag.main_title}}</p>
      <p class="subtitle">{{mag.sub_title}}</p>
  </div>
</template>

<script>
export default {
    name: 'magazine',
    props:{
        mag:{
            type: Object,
            default:function () {
                return { }
            }
        }
    },
    methods:{
        magClick(id){
            this.$emit('magClick',id)
        }
    }
}
</script>

<style scoped lang="scss">
.mag-group{
    width: 120px;
    display: flex;
    flex-direction: column;
    img{
        width: 100%;
    }
    .title{
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        padding: 5px;
    }
    .subtitle{
        font-size: 14px;
        color: #aaaaaa;
        padding: 5px;
    }
}
</style>