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
          <p class="title">{{magazine.main_title}}</p>
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
        <div class="address-group" v-if="hasActive" @click="toSelAddress">
          <span class="sel-address" v-if="selAddress">{{selAddress.province}} {{selAddress.city}} {{selAddress.district}} {{selAddress.address}}</span>
          <span class="sel-address" v-else>选择地址获得赠品</span>
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
        name:'gh_1d845bdf82d8',
        path:`pages/magPreview/magPreview.html?mag_id=${this.mag_id}`
      },
      is_mine: true,
      is_free: true,
      campaign_id: null,
      hasActive: false,
      
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
      magazine:{},
      selAddress: null
    }
  },
  props:['mag_id'],
  created(){
    
  },
  activated(){
    if(this.$store.state.address.selAddressStr){
      this.selAddress = JSON.parse(this.$store.state.address.selAddressStr)
      console.log('这是 selAddress==' + this.$store.state.address.selAddressStr)
      console.log(this.selAddress)
    }else{
      console.log('detail created')
    }
    this.loadMagazineDetail()
  },
  mounted(){
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
    toSelAddress(){
      this.$router.push({name:'address',params:{isSel: true}})
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
    destroyed(){
      this.$store.commit('address/clearSelAddress')
    },
    wxPay(payConfig){
      console.log(`wxpayconfig:${payConfig}`)
      var that = this
      wx.chooseWXPay({
        timestamp: payConfig.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payConfig.nonceStr, // 支付签名随机串，不长于 32 位
        package: payConfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: payConfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payConfig.paySign, // 支付签名
        success: function (res) {
          console.log('成功'+res)
          that.loadMagazineDetail()
          // 支付成功后的回调函数
          this.isShowBuy = false
          toast({
            text:'支付成功'
          })
          if(that.hasActive){
            let params ={
              tokens: auth.getToken(),
              magazine_id: this.mag_id,
              amount: this.buyNum,
              campaign_id: this.campaign_id,
              address_id: this.selAddress.address_id
            }
            that.$api.magazine.uploadMagazineAddress(params).then(res => {
              console.log(res)
            })
          }
          
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
          this.onePrice = res.data.price
          this.is_free = res.data.is_free;
          if(res.data.is_mine){
            this.is_mine = res.data.is_mine;
          }
          document.title = this.magazine.main_title
          if(res.data.campaign_id){
            this.campaign_id = res.data.campaign_id
            this.hasActive = true
          }
          
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