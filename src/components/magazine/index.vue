<template>
  <div class="mag-group" @click="magClick(mag.magazine_id)" :style="{width: magwidth + 'px',height: magheight + 'px'}">
      <img :src="mag.logo" alt=""  :style="{maxHeight: magwidth *  1.28 + 'px'}">
      <p class="title" :style="{fontSize: titlefont + 'px'}">{{mag.main_title}}</p>
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
        },
        magwidth:{
            type: Number,
            default: 120
        },
        magheight:{
            type: Number,
            default: 210
        },
        titlefont:{
            type: Number,
            default:16
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
    background-color: #ffffff;
    // border: 1px solid #eeeeee;
    box-shadow: 3px 3px 5px 5px #eeeeee;
    img{
        width: 100%;
    }
    .title{
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        padding-top: 5px;
        padding-left: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
    .subtitle{
        font-size: 14px;
        color: #aaaaaa;
        padding: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
}
</style>