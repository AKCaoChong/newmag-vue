<template>
  <div class="container" ref="wrapper">
        <div class="content">
            <loading v-if="showloading"></loading>
            <div class="top-comment">
                <img :src="recommend.logo" alt="" srcset="">
                <p class="comment-title">{{recommend.main_title}}</p>
                <p class="comment-time">{{recommend.sub_title}}</p>
                <button class="read" @click="readClick(recommend.magazine_id)">开始阅读</button>
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
                        <button class="read-code">电子刊</button>
                    </script>
                </wx-open-launch-weapp>
                <!-- <button class="other">电子刊</button> -->
            </div>
            <div class="camption-group" v-if="camptions.length>0">
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide v-for="camp in camptions" :key="camp.id" class="swiper-item">
                        <p>{{camp.campaign_title}}</p>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="line"></div>
            <div class="sub-title">最新期刊</div>
            <div class="mag-list">
                <swiper class="list-swiper" :options="listSwiperOpt">
                    <swiper-slide v-for="mag in maglist" :key="mag.magazine_id" class="swiper-mag">
                        <magazine :mag="mag" @magClick="readClick(mag.magazine_id)" :titlefont="12"></magazine>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import magazine from '../../components/magazine'
import loading from '../../components/loading'
import BScroll from 'better-scroll'
// import toast from '../../components/toast'
import wx from 'weixin-js-sdk'
export default {
    name:"home",
    data(){
        return{
            scroll:null,
            showloading: false,
            recommend:{
                
            },
            maglist:[
                
            ],
           
            swiperOption: {
                direction: 'vertical',
                centeredSlides: true,
                observer:true,
                observeParents:true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                loop: true
            },
            listSwiperOpt:{
                slidesPerView:'auto',
                spaceBetween:10,
                loopedSlides: 5,
                freeMode: true,
                
            },
            camptions:[
                
            ]
        }
    },
    components:{
      Swiper,
      SwiperSlide,
      magazine,
      loading
    },
    methods:{
        handleLaunchSuccess(){
            console.log("success")
        },
        handleLaunchError(){
            console.log('error')
        },
        readClick(magId){
          console.log(magId)  
        //   this.$router.push('/address')
          this.$router.push('/magazine/detail/'+magId)
        },
        loadData(){
            this.$api.home.getCampaign().then(res => {
                console.log(res)
                if(res.code == 0){
                    this.camptions.push(res.data)
                    this.swiperOption.autoplay =  this.camptions.length != 1 ? {
                        direction: 'vertical',
                        centeredSlides: true,
                        observer:true,
                        observeParents:true,
                        autoplay: {
                            delay: 5000,
                            disableOnInteraction: false
                        },
                        loop: true
                    } : false
                }else{
                    console.log(res.message)
                }
            })
            this.$api.home.getHomeMagazine().then(res => {
                console.log(res)
                if(res.code == 0){
                    this.recommend = res.data.focus
                    this.maglist = res.data.top
                    this. weapp = {
                        name:'gh_1d845bdf82d8',
                        path:`pages/magPreview/magPreview.html?mag_id=${this.recommend.magazine_id}`
                    }
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            setTimeout(() => {
                                this.scroll = new BScroll(this.$refs.wrapper, {
                                    click:true,
                                    disableMouse: false,
                                    disableTouch: false,
                                    bounce:200
                                })
                            }, 1000);
                        }else{
                            this.scroll.refresh();
                        }
                    })
                }else{
                    console.log(res.message)
                    
                }
            })
            
            
        }
    },
    created(){
        console.log(this.$route)
        let res = {'openTagList': 'wx-open-launch-weapp'}
        wx.config(res)
    },
    mounted(){
        // setTimeout(() => {
        //     this.showloading = false
        // }, 4000);
        this.loadData()
    }
}
</script>

<style scoped lang="scss">
.container{
    .top-comment{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            margin: 10px auto;
            width: 70%;
        }
        p{
            text-align: center;
            padding: 5px;
        }
        .comment-title{
            font-size: 16px;
            color: #333333;
            font-weight: bold; 
        }
        .comment-time{
            padding: 5px;
            color: #aaaaaa;
            font-size: 14px;
        }
        button{
            border: none;
            width: 160px;
            height: 40px;
            border-radius: 10px;
            text-align: center;
            margin: 5px;
            font-size: 16px;
        }
        .read{
            background-color: #C52E43;
            color: #ffffff;
        }
        .other{
            background-color: #eeeeee;
            color: #333333;
        }
    }
    .camption-group{
        margin: 10px;
        height: 40px;
        padding: 5px;
        box-sizing: border-box;
        background-color: #eeeeee;
        border-radius: 4px;
        .swiper{
            width: 100%;
            height: 30px;
            .swiper-item{
                height: 30px;
                p{
                    font-size: 16px;
                    color: #aaaaaa;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
    }
    .line{
        background-color: #eeeeee;
        height: 8px;
        margin: 10px 0;
    }
    .sub-title{
        height: 38px;
        line-height: 38px;
        border-radius: 6px;
        margin: 0 10px;
        font-size: 16px;
        font-weight: bold;
        color: #333333;
    }
    .mag-list{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        padding-bottom: 5px;
        .swiper-mag{
            width: auto;
        }
    }
}
</style>