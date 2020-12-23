<template>
  <scroll class="container">
    <div class="content">
      <div class="top-group">
        <div class="info-group">
          <img :src="user.head" alt="" class="info-head" />
          <p class="info-name">{{ user.name }}</p>
          <div class="info-list">
            <router-link :to="tag.path" tag="div" class="info-tag" v-for="tag in tagList" :key="tag.id">
              <div class="left-tag" :style="{'width': tagw+'px'}">
                <img :src="tag.img" alt="" />
                <p class="tag-title">{{ tag.title }}</p>
              </div>
              <div class="right-line"></div>
            </router-link>
            <!-- <div class="info-tag" v-for="tag in tagList" :key="tag.id">
              <div class="left-tag" :style="{'width': tagw+'px'}">
                <img :src="tag.img" alt="" />
                <p class="tag-title">{{ tag.title }}</p>
              </div>
              <div class="right-line"></div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="bottom">
        <cell class="cell-group" v-for="item in selList" :key="item.id" :title="item.title" @cellAction="login(item.id)">
          <img :src="item.img" alt="" slot="icon">
        </cell>
      </div>
      
    </div>
  </scroll>
</template>

<script>
import scroll from "../../components/scroll";
import cell from "../../components/cell"
export default {
  name: "ucenter",
  data() {
    return {
      tagw:(document.documentElement.clientWidth - 40)/4,
      user: {
        head:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607336378834&di=9df0e9e97cd7f5e58c3d86b2ee2d5da3&imgtype=0&src=http%3A%2F%2Fdiy.qqjay.com%2Fu%2Ffiles%2F2012%2F0217%2Fb693a3b6d232ffe861da22287c888729.jpg",
        name: "ZedLine",
      },
      tagList: [
        {
          img: require("@/assets/img/mine_mag.png"),
          title: "我的期刊",
          id: "0",
          path:'/ucenter/magazine'
        },
        {
          img: require("@/assets/img/mine_collect.png"),
          title: "我的收藏",
          id: "1",
          path:'/ucenter/collect'
        },
        {
          img: require("@/assets/img/mine_addr.png"),
          title: "我的地址",
          id: "2",
          path:'/ucenter/address'
        },
        {
          img: require("@/assets/img/mine_model.png"),
          title: "明星电子刊",
          id: "3",
          path:'/ucenter/address'
        },
      ],
      selList:[
      {
        img:require("@/assets/img/sel_mag.png"),
        title:"购买纸刊",
        id:'0'
      },
      {
        img:require("@/assets/img/sel_share.png"),
        title:"分享小程序",
        id:'1'
      },
      {
        img:require("@/assets/img/sel_conact.png"),
        title:"联系客服",
        id:'2'
      },
      {
        img:require("@/assets/img/sel_hello.png"),
        title:"明星电子刊",
        id:'3'
      }
    ]
    };
  },
  methods:{
    login(id){
      // this.$toast({text:'hello'})
      console.log(id)
      let data = {
        "phone": '12811159868',
        "code": '2324'
      }
      this.$api.login.getLogin(data).then(res => {
        console.login(res)
      })
    },
    
  },

  components: {
    scroll,
    cell
  },
};
</script>

<style scoped lang="scss">
.container {
  .content {
    width: 100%;
    .top-group {
      padding-top: 20px;
      position: relative;
      width: 100%;
      height: 200px;
      background: linear-gradient(#eeeeee, #cccccc);
      .info-group {
        margin-top: 50px;
        height: 100%;
        background: linear-gradient(#ffffff, #eeeeee);
        border-radius: 20px;
        margin-left: 20px;
        margin-right: 20px;
        // padding: 0 20px;
        // box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .info-head {
          width: 80px;
          height: 80px;
          border: solid #eeeeee 2px;
          border-radius: 40px;
          margin-top: -30px;
          box-sizing: border-box;
        }
        .info-name {
          font-size: 17px;
          font-weight: bold;
          color: #333333;
          text-align: center;
          padding-top: 10px;
        }
        .info-list {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 0;
          box-sizing: border-box;
          width: 100%;
          .info-tag {
            display: flex;
            justify-content: center;
            align-items: center;
            .left-tag {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              img{
                width: 50px;
                height: 50px;
                margin-bottom: 10px;
              }
              .tag-title {
                text-align: center;
                font-size: 14px;
                color: #666;
                font-weight: 300;
              }
            }
          }
          .right-line {
            display: inline-block;
            height: 20px;
            width: 1px;
            background-color: #cccccc;
          }
        }
      }
    }
    .bottom{
      margin-top: 60px;
      .cell-group{
        margin-left: 10px;
        margin-right: 10px;
        border-bottom: 1px solid #cccccc;
      }
    }
    
  }
}
</style>