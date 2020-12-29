<template>
  <div class="container">
      <swiper class="swiper-container" :options="swiperOption">
        <swiper-slide class="swiper-slide"  v-for="(item, index) in magazine.prewview" :key="index">
          <img :src="item.zineimg_url" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="button-group">
        <div v-if="is_mine" class="read-code">
          <wx-open-launch-weapp id="launch-btn" :username="weapp.name" :path="weapp.path" @launch="handleLaunchSuccess" @error="handleLaunchError">
            <script type="text/wxtag-template">
                <style>
                  .read-code {
                    background-color: #333333;
                    color: #ffffff;
                    border: none;
                    width: 160px;
                    height: 46px;
                    border-radius: 10px;
                    text-align: center;
                    margin: 5px;
                    font-size: 16px;
                  }
                </style>
                <button class="read-code">开始阅读</button>
            </script>
          </wx-open-launch-weapp>
        </div>
        <button class="buy-code" @click="buyCodeClick">{{is_mine?'再次购买':'购买阅读码'}}</button>
      </div>
      <div class="buy-group" :style="isShowBuy ? 'transform:translateY(0%);': 'transform:translateY(100%);'">
        <div class="top-group">
          <span>购买</span>
          <img src="@/assets/img/close.png" alt="" @click="closeBuyView">
        </div>
        <div class="info-group">
          <p class="title">{{mag.title}}</p>
          <p class="buy-dec">订阅说明</p>
        </div>
        <div class="price-group">
          <div class="stepper">
            <span :class="{'disable':disabled}" @click="bindMinus">-</span>
            <input type="number" @input="bindBuyNumInput" v-model="buyNum">
            <span class="plusStatus" @click="bindPlus">+</span>
          </div>
          <span class="price-label">￥{{customPrice}}</span>
        </div>
        <div class="address-group">
          <span class="sel-address">选择地址获得赠品</span>
          <img class="right" src="@/assets/img/address_right.png" alt="">
        </div>
        <button class="pay" @click="payClick">支付购买</button>
      </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import toast from '../../components/toast'
import auth from '../../utils/auth'
import wx from 'weixin-js-sdk'
export default {
  name:'magDetail',
  components:{
    Swiper,
    SwiperSlide
  },
  data(){
    return{
      showStyle: {
        transform:'translateY(0%);'
      },
      hideStyle: {
        transform: 'translateY(100%)'
      },
      weapp:{
        name:'gh_20e7279bd2dc',
        path:'pages/home/home.html'
      },
      is_mine: true,
      is_free: true,
      imgList:[
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608096997685&di=736828bca9b7c6e12e8eb37eac0f70e3&imgtype=0&src=http%3A%2F%2Fpic.17qq.com%2Fuploads%2Fhhiheipojz.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608096997683&di=d19e1e0452026da81ca0fd9c876290d3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F07%2F20160807154746_mXxeG.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608096997682&di=e2721f0273a7636243a77f78e7eb263a&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn09%2F133%2Fw640h1093%2F20180705%2Fa906-hevauxk7661490.jpg'
      ],
      disabled: false,
      mag:{
        title:'万茜 千面一人'
      },
      swiperOption: {
        //显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true, //允许分页点击跳转
          dynamicBullets: true
        },
        
        //自动轮播
        autoplay: {
          delay: 5000
        },
        //开启循环模式
        loop: true,
      },
      buyNum:1,
      onePrice: 16,
      customPrice: 16,
      isShowBuy: false,
      magazine:{}
    }
  },
  props:['mag_id'],
  created(){
    console.log('detail created')
  },
  mounted(){
    console.log('detail')
    // let res = {'openTagList': 'wx-open-launch-weapp'}
    // wx.config(res)
    console.log(this.mag_id);
    this.loadMagazineDetail()
  },
  watch:{
    buyNum(val){
      if(val <= 1){
        this.disabled = true
      }else{
        this.disabled = false
      }
    }
  },
  methods:{
    handleLaunchSuccess(){
      console.log("success")
    },
    handleLaunchError(){
      console.log('error')
    },
    buyCodeClick(){
      console.log('show',this.isShowBuy)
      this.isShowBuy = true
    },
    closeBuyView(){
      this.isShowBuy = false
    } ,
    //开始阅读 去小程序
    readClick(){

    },
    // -----
    bindMinus(){
      if(this.buyNum <= 1){
        return
      }else{
        this.buyNum--
        this.customPrice = this.buyNum * this.onePrice
      }
    },
    bindBuyNumInput(){
      console.log(this.buyNum)
      if(this.buyNum <= 1){
        this.buyNum = 1
      }
      this.customPrice = this.buyNum * this.onePrice
    },
    //+++
    bindPlus(){
      this.buyNum++
      this.customPrice = this.buyNum * this.onePrice
    },
    payClick(){
      let params ={
        tokens: auth.getToken(),
        magazine_id: this.mag_id,
        amount: this.buyNum
      }
      this.$api.magazine.buyMagazine(params).then(res => {
        console.log(res)
        if(res.code == 0){
          this.wxPay(res.data)
        }
      })
    },
    wxPay(payConfig){
      console.log(`wxpayconfig:${payConfig}`)
      wx.chooseWXPay({
        timestamp: payConfig.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payConfig.nonceStr, // 支付签名随机串，不长于 32 位
        package: payConfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: payConfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payConfig.paySign, // 支付签名
        success: function (res) {
          console.log('成功'+res)
          this.loadMagazineDetail()
          // 支付成功后的回调函数
          this.isShowBuy = false
          toast({
            text:'支付成功'
          })
        },
        cancel: function(res){
          console.log('取消'+res)
          toast({
            text:'已取消支付'
          })
        },
        fail: function(err){
          console.log(err)
          toast({
            text:'支付错误'
          })
        }
      });
    },
    loadMagazineDetail(){
      let params = {
        magazine_id: this.mag_id
      }
      this.$api.magazine.getMagazineDetail(params).then(res => {
        console.log(res)
        if(res.code == 0){
          this.magazine = res.data;
          // this.is_free = res.data.is_free;
          // this.is_mine = res.data.is_mine;
        }else{
          toast({
            text: res.message
          })
        }
      })
    },

  }
}
</script>

<style scoped lang="scss">
.container /deep/.swiper-pagination-bullet-active{
  background: #C52E43;
}
.container{
  bottom: 0;
  .swiper-container{
    width: 100%;
    height: 100%;
    .swiper-slide{
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        max-height: 100%;
      }
    }
  }
  .swiper-pagination{

  }
  .button-group{
    z-index: 100;
    position: absolute;
    bottom: 100px;
    left: 50%;
    width: 140px; 
    margin-left: -60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    button{
      color: #ffffff;
      height: 40px;
      margin: 10px;
      border-radius: 10px;
      font-size: 16px;
      width: 100%;
      border: none;
    }
    // .read-code{
    //   background-color: #333333;
    //   color: #ffffff;
    //   height: 40px;
    //   margin: 10px;
    //   border-radius: 10px;
    //   font-size: 16px;
    //   width: 100%;
    //   border: none;
    // }
    .buy-code{
      background-color: #C52E43;
      
    }
  }
  .buy-group{
    z-index: 101;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    padding: 20px;
    box-sizing: border-box;
    transition: all 0.25s linear;
    
    .top-group{
      padding: 5px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        font-size: 16px;
        color: #333333;
      }
      img{
        width: 18px;
        height: 18px;
      }
    }
    .info-group{
      padding: 10px 0;
      width: 100%;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title{
        font-size: 18px;
        text-align: center;
        font-weight: bold;
        color: #333333;
        padding: 5px;
      }
      .buy-dec{
        font-size: 14px;
        color: #cccccc;
        padding: 5px;
      }
    }
    .price-group{
      padding: 10px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .stepper{
        display: flex;
        width: 45%;
        height: 40px;
        border: 1px solid #cccccc;
        border-radius: 3px;
        margin: 10px 0;
        span{
          width: 20%;
          line-height: 40px;
          text-align: center;
          color: #333333;
          background-color: #eeeeee;
          font-size: 18px;
          border: none;
        }
        .disable{
          color: #aaaaaa;
        }
        input{
          border: none;
          background-color: #eeeeee;
          width: 60%;
          height: 100%;
          float: left;
          margin: 0 auto;
          text-align: center;
          font-size: 14px;
          border-left: 1px solid #cccccc;
          border-right: 1px solid #cccccc;
          -webkit-appearance: none;
          border-radius: 0;
        }
      }
      .price-label{
        width: 45%;
        height: 40px;
        line-height: 40px;
        background: #d6d6d6;
        border-radius: 3px;
        text-align: center;
        margin: 10px 0;
        padding: 3px 0;
        color: #000;
        font-size: 18px;
      }
    }
    .address-group{
      border-bottom: 1px solid #eeeeee;
      padding: 10px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      .sel-address{
        font-size: 16px;
        color: #666666;
      }
      .right{
        width: 24px;
        height: 28px;
      }
    }
    .pay{
      border: none;
      height: 40px;
      line-height: 40px;
      width: 100%;
      text-align: center;
      color: #fff;
      background: #c6343e;
      margin-top: 15px;
      margin-bottom: 5px;
      font-size: 16px;
      border-radius: 10px;
    }
  }
}

</style>