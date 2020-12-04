<template>
  <div class="container" ref="wrapper">
        <div class="content">
            <loading v-if="showloading"></loading>
            <div class="top-comment">
                <img :src="recommend.logo" alt="" srcset="">
                <p class="comment-title">{{recommend.main_title}}</p>
                <p class="comment-time">{{recommend.sub_title}}</p>
                <button class="read" @click="readClick(recommend.magazine_id)">开始阅读</button>
                <button class="other">电子刊</button>
            </div>
            <div class="camption-group">
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide v-for="camp in camptions" :key="camp.id" class="swiper-item">
                        <p>{{camp.title}}</p>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="line"></div>
            <div class="sub-title">最新期刊</div>
            <div class="mag-list">
                <swiper class="list-swiper" :options="listSwiperOpt">
                    <swiper-slide v-for="mag in maglist" :key="mag.id" class="swiper-mag">
                        <magazine :mag="mag" @magClick="readClick"></magazine>
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
export default {
    name:"home",
    data(){
        return{
            scroll:null,
            showloading: false,
            recommend:{
                logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                main_title:"复古情结",
                sub_title:"2020年10月刊",
                magazine_id:"1111",
                is_free:'1'
            },
            maglist:[
                {
                    magazine_id:'1',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                },
                {
                    magazine_id:'12',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                },
                {
                    magazine_id:'4',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                },
                {
                    magazine_id:'122',
                    logo:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
                    main_title:"复古情结",
                    sub_title:"2020年10月刊"
                }
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
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            camptions:[
                {
                    id:'0',
                    title:'vvvvvv这是标题1这是标题1这是标题1这是标题1这是标题1'
                },
                {
                    id:'1',
                    title:'aaaaa这是标题1这是标题1这是标题1这是标题1这是标题1'
                },
                {
                    id:'2',
                    title:'dddd这是标题1这是标题1这是标题1这是标题1这是标题1'
                },
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
        readClick(magId){
          console.log(magId)  
        },
        loadData(){
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
                
                console.log(this.scroll)
                }else{
                    this.scroll.refresh();
                }
            })
            
        }
    },
    created(){
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
        height: 50px;
        padding: 10px;
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
        .swiper-mag{
            width: auto;
        }
    }
}
</style>