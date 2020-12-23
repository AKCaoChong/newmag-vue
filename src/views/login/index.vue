<template>
  <div class="container">
      <div class="bg-group">
          <img :src="bgimg" alt="">
      </div>
      <div class="wechat-login" :style="showlogin?'transform:  translateY(0);':''">
          <p>瑞丽电子杂志</p>
          <p>随时携带的时尚</p>
          <button class="weichat" @click="wechatLogin">微信登录</button>
      </div>
      <div class="bind-phone" :style="showbind?'transform:  translateY(0);':''">
            <p>绑定手机号</p>
            <input type="number" class="phone" placeholder="请输入手机号" v-model="phone">
          
            <div class="idengify-group">
                <input type="text" v-model="verifyCode" class="identify-code" placeholder="请输入图形码">
                <div style="border:none;" @click="refreshCode">
                    <SIdentify :identifyCode="identifyCode"></SIdentify>
                </div>
            </div>
            <div class="code-group">
                <input type="text" class="code" placeholder="请输入验证码" v-model="smsCode">
                <button class="get-code"  v-debounce="sendSmsCode" :disabled="smsDisabled" :style="smsDisabled?'background-color: #aaaaaa':'background-color: #C52E43'">{{btnText}}</button>
            </div>
          <button class="bind" @click="bindPhoneClick">绑定</button>
      </div>
  </div>
</template>

<script>
import toast from '../../components/toast'
import auth from '../../utils/auth'
import SIdentify from '../../components/sdientity'
export default {
    data(){
        return{
            showlogin: false,
            showbind:false,
            bgimg:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
            phone:'',
            verifyCode:'',
            smsCode:'',
            code:'',
            identifyCode:"",
            have_mobile: false,
            tokens: '',
            tks:'',
            btnText:'获取验证码',
            smsDisabled: false,
            timer: null,
            seconds: 90,
        }
    },
    components:{
        SIdentify
    },
    mounted(){
        this.getSign()
        this.loadValidateCode()
    },
    methods:{
        wechatLogin(){
            this.getSign()
            this.showlogin = false
            setTimeout(() => {
                this.showbind = true
            }, 250);
            
        },
        getSign(){
            let thecode = this.getCode()
            if(thecode){
                this.showlogin = false
                setTimeout(() => {
                    this.showbind = true
                }, 250);
                let params ={
                    code: thecode,
                    state: 'RAYLI2020'
                }
                console.log('denglu')
                this.$api.login.getLogin(params).then(res => {
                    if(res.code == 0){
                        this.have_mobile = res.have_mobile
                        this.tks = res.tks,
                        this.tokens = res.tokens
                        if(this.hava_mobile == 0){
                            this.showbind = true
                            this.loadValidateCode()
                        }else{
                            this.showbind = false
                            let user = {
                                headimg: res.headimg,
                                nickname: res.nickname
                            }
                            auth.setUserToken(user,res.tokens)
                        }
                    }else{
                        toast({
                            text: res.message
                        })
                    }
                })
                
            }else{
                setTimeout(() => {
                    this.showlogin = true
                }, 500);
                var redirect = window.location.href
                console.log("redirect==="+ redirect)
                // if(redirect.indexOf(':8081') != -1){
                //     redirect=redirect.split(':')[0]
                // }
                // console.log(redirect)
                auth.redirectUri = redirect
                window.location.href = auth.authUrl
            }
        },
        getCode(){
            var url = location.search // 返回当前window url 问号后的部分
            var code = "";
            if (url.indexOf("code=") != -1) {
                var split = url.split("code=")
                code = split[1].split("&")[0]
            }
            console.log("code==="+code)
            this.code = code;
            return code;
        },
        // 获取验证码
        sendSmsCode(){
            console.log('hellollllllll')
            this.timer = setInterval(() => {
                this.seconds-=1
                if(this.seconds == 0){
                    this.btnText = '获取验证码'
                    clearInterval(this.timer)
                    this.smsDisabled = false
                }else{
                    this.btnText = this.seconds + 's'
                    this.smsDisabled = true
                }
            }, 1000);
            if(this.checkPhone(this.phone) && this.verifyCode.length>0){
                let params = {
                    mobile: this.phone,
                    code: this.verifyCode,
                    tks: this.tks
                }
                this.$api.login.getSmsCode(params).then(res => {
                    if(res.code == 0){
                        toast({
                            text:'发送成功'
                        })
                        this.timer = setInterval(() => {
                            this.seconds-=1
                            if(this.seconds == 0){
                                this.btnText = '获取验证码'
                                clearInterval(this.timer)
                                this.smsDisabled = false
                            }else{
                                this.btnText = this.seconds + 'S'
                                this.smsDisabled = true
                            }
                        }, 1000);
                    }else{
                        toast({
                            text:'发送失败'
                        })
                    }
                })
            }else{
                toast({text:'请输入正确的手机号'})
            }
        },
        // 函数节流
        // throttle(func,delay){
        //     let last = null;
        //     return () =>  {
        //         const now = +new Date()
        //         if(now - last > delay){
        //             func()
        //             last = now
        //         }
        //     }
        // },
        // // 函数防抖
        // debounce(func, delay){
        //     let timeout = null
        //     return () => {
        //         if(timeout){clearTimeout(timeout)}
        //         timeout = setTimeout(() => {
        //             func()
        //         }, delay);
        //     }
        // },

        // 函数防抖
        debounce(func,delay){
            let timeOut = null
            console.log('debounce'+this)
            return function(){
                if(timeOut){
                    clearTimeout(timeOut)
                }
                let that = this,args = arguments
                console.log('new func'+that)
                timeOut = setTimeout(func.apply(that,args), delay);
            }
        },
        // 点击获取验证码
        getCodeClick(){
            
            this.debounce(this.sendSmsCode,250)()
            
        },
        //从服务器获取 verifycode
        loadValidateCode(){
            let params = {
                tks: this.tks
            }
            this.$api.login.getValidateCode(params).then(res => {
                if(res.code == 0){
                    this.identifyCode = res.code
                }else{
                    toast({
                        text: res.message
                    })
                }
            })
        },
        bindPhoneClick(){
            this.showbind = false
            if(this.checkPhone(this.phone)){
                console.log(this.phone)
                console.log(this.smsCode)
                if(this.smsCode.length>0){
                    console.log(this.smsCode)
                    //绑定手机号
                    let params = {
                        tks: this.tks,
                        mobile: this.phone,
                        smscode: this.smsCode
                    }
                    this.$api.login.bindPhone(params).then(res => {
                        if(res.code == 0){
                            this.showbind = false
                            let user = {
                                headimg: res.headimg,
                                nickname: res.nickname
                            }
                            auth.setUserToken(user,res.tokens)
                            setTimeout(() => {
                                const from = this.$route.query['from']
                                if(from){
                                    this.$router.push(from)
                                }else{
                                    this.$router.replace('/')
                                }
                            }, 250);
                        }else{
                            toast({
                                text: res.message
                            })
                        }
                    })
                }
            }else{
                toast({text:'请输入正确的手机号'})
            }
        },
        checkPhone(phone){
            return (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone))
        },
        //图形验证码
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.loadValidateCode()
            // this.makeCode(this.identifyCodes, 4);
        },
        // makeCode(o, l) {
        //     for (let i = 0; i < l; i++) {
        //         this.identifyCode += this.identifyCodes[
        //         this.randomNum(0, this.identifyCodes.length)
        //         ];
        //     }
        // }
    }
}
</script>

<style scoped lang="scss">

.container{
    bottom: 0;
    .bg-group{
        background-color: #eeeeee;
        width: 100%;
        height: 100%;
        overflow: hidden;
        img{
            display: block;
            width: 80%;
            height: auto;
            margin: 40px auto;
        }
    }
    
    .wechat-login{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 26px;
        background-color: #ffffff;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        box-sizing: border-box;
        transition: transform 0.25s linear;
        transform:  translateY(100%);
        p{
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
        }
        p:nth-child(1){
            color: #333333;
            font-size: 20px;
            font-weight: bold;
        }
        p:nth-child(2){
            color: #aaaaaa;
            font-size: 16px;
        }
        button{
            margin-top: 20px;
            border: none;
            background-color: #333333;
            color: #ffffff;
            border-radius: 10px;
            height: 40px;
            width: 100%;
            text-align: center;
            font-size: 16px;
        }
    }
    
    .bind-phone{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 26px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #ffffff;
        transition: transform 0.25s linear;
        transform: translateY(100%);
        p{
            font-size: 20px;
            color: #333333;
            text-align: center;
            font-weight: bold;
            padding-bottom: 10px;
        }
        input{
            width: 100%;
            background-color: #eeeeee;
            padding: 12px;
            box-sizing: border-box;
            border-radius: 10px;
            font-size: 16px;
            color: #333333;
            border: none;
            margin: 10px auto;
        }
        .code-group{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            input{
                flex: 1;
                margin-right: 10px;
            }
            button{
                width: 100px;
                height: 38px;
                background-color: #C52E43;
                border-radius: 5px;
                color: #ffffff;
                text-align: center;
                font-size: 16px;
                border: none;
            }
        }
        .idengify-group{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .identify-code{
                flex: 1;
                margin-right: 10px;
            }
        }
        .bind{
            width: 100%;
            height: 40px;
            background-color: #333333;
            color: #fff;
            text-align: center;
            margin: 20px auto;
            border-radius: 10px;
            border: none;
            font-size: 16px;
        }
    }
}

</style>