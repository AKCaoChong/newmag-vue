<template>
  <scroll class="container" :data="codeList" pulldown pullup @pulldown="onPulldownRefresh" @scrollToEnd="onReachBottom">
    <div class="content">
        <div class="top-desc">
            <p class="desc">每个阅读码对应一本电子杂志,每个阅读码只可被激活一次,每人只能激活每本刊的一个阅读码,更多阅读码可以送给朋友</p>
        </div>
        <maghor :magazine="magazine"  @readCodeAction="readCodeClick" @readBeignAction="readBeginClick" :hideread='true'></maghor>
        <div class="code-info">
            <div class="code-group" v-for="code in codeList" :key="code.code">
                <div class="code-used" v-if="code.status==200">
                    <div class="used-left">
                        <span class="used code">阅读码:{{code.code}}</span>
                        <span class="used time">激活时间: {{code.activate_time}}</span>
                    </div>
                    <div class="used-info">
                        <img :src="code.headimg" alt="">
                        <span class="used name">{{code.nickname}}</span>
                    </div>
                </div>
                <div class="code-normal" v-else>
                    <span class="code left">阅读码:{{code.code}}</span>
                    <button class="used copy" v-copy="code.code" >复制</button>
                    <button class="used send" style="display:none;">送好友</button>
                </div>
            </div>
            
            
        </div>
    </div>
</scroll>
</template>

<script>
import scroll from '../../components/scroll'
import maghor from '../../components/magazineMine'
// import toast from '../../components/toast'
import auth from '../../utils/auth'
export default {
    name:'codeList',
    data(){
        return{
            codeList:[
                
            ],
            pagenum: 0,
            pagecount: 10,
        }
    },
    components:{
        scroll,
        maghor
    },
    props:{
       
    },
    computed:{
        magazine(){
            console.log(this.$store.state.ucenter.minemag)
            return JSON.parse(this.$store.state.ucenter.minemag)
        }
    },
    mounted(){
        
    },
    created(){
        this.loadReadCodeList()
    },
    methods:{
        readCodeClick(mag){
            console.log(mag)
        },
        readBeginClick(mag){
            console.log(mag)
        },
        loadReadCodeList(){
            let params = {
                magazine_id: this.magazine.magazine_id,
                tokens: auth.getToken(),
                pagenum: this.pagenum,
                pagecount: this.pagecount
            }
            this.$api.ucenter.getMyReadCode(params).then(res => {
                if(res.code == 0){
                    if(this.pagenum == 0){
                        this.codeList = res.data
                    }else{
                        this.codeList.concat(res.data)
                    }
                }else{
                    if(this.pagenum >0){
                        this.pagenum -= 1
                    }
                }
            })
        },
        onPulldownRefresh(){
            console.log('load refresh')
            this.pagenum = 0
            this.loadReadCodeList()
        },
        onReachBottom(){
            console.log('load more')
            this.pagenum+=1
            this.loadReadCodeList()
        }

    }
}
</script>

<style scoped lang="scss">
.container{
    bottom: 0;
    .content{
        width: 100%;
        .top-desc{
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            background: linear-gradient(#ffffff,#aaaaaa);
            .desc{
                width: 100%;
                font-size: 16px;
                color: #333333;
                
            }
        }
    }
    .code-info{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        .code-used{
            margin-top:10px;
            width: 100%;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            background-color: #eeeeee;
            border-radius: 5px;
            box-sizing: border-box;
            .used-left{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                flex: 1;
                .used{
                    font-size: 14px;
                    color: #333333;
                }
            }
            .used-info{
                display: flex;
                justify-content: space-around;
                align-items: center;
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .used{
                    margin-left: 10px;
                    font-size: 14px;
                    color: #333333;
                }
            }
        }
        .code-normal{
            margin-top: 10px;
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
            box-shadow: 2px 2px 3px #eeeeee;
            border-radius: 5px;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .code{
                font-size: 14px;
                color: #333333;
            }
            .used{
                color: #ffffff;
                font-size: 14px;
                border: none;
                border-radius: 5px;
                text-align: center;
                width: 60px;
                height: 36px;
            }
            .copy{
                background-color: #333333;
            }
            .send{
                background-color: #c52e43;

            }
        }
    }
}
</style>