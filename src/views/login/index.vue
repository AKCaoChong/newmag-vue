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
          <div class="code-group">
            <input type="text" class="code" placeholder="请输入验证码" v-model="code">
            <button class="get-code" @click="getCodeClick">获取验证码</button>
          </div>
          <button class="bind" @click="bindPhoneClick">绑定</button>
      </div>
  </div>
</template>

<script>
import toast from '../../components/toast'
import auth from '../../utils/auth'
export default {
    data(){
        return{
            showlogin: false,
            showbind:false,
            bgimg:"http://app.raylihome.com.cn/furniture/Public/magazine/2020-09-28/5f71b5a3c57e9.jpg",
            phone:'',
            code:''
        }
    },
    created(){
        
        
    },
    mounted(){
        setTimeout(() => {
            this.showlogin = true
        }, 500);
        // this.getSign()
        let thecode = this.getCode()
        if(thecode){
            //有code 去登录

        }
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
                //请求后台登录
                // wechatLogin(thecode).then(res =>{
                //     if(res.code == 200){
                //         auth.setUserId(res.user.uid)
                //         auth.setOpenId(res.user.openid)
                //     }else if(res.code == 5001){
                //         auth.setOpenId(res.user.openid)
                //         this.showQrcode = true
                //     }else{
                //         toast({text:'登录失败'})
                //     }
                // })
                
        }else{
            var redirect = window.location.href
            console.log("redirect==="+ redirect)
            // if(redirect.indexOf(':8081') != -1){
            //     redirect=redirect.split(':')[0]
            // }
            // console.log(redirect)
            auth.redirectUri = "http://192.168.19.50:8081/login"
            window.location.href = auth.authUrl
        }
        },
        getCode(){
            var url = location.search // 返回当前window url 问号后的部分
            var code = "";
            if (url.indexOf("?") != -1) {
                var split = url.split("?code=")
                code = split[1].split("&")[0]
            }
            console.log("code==="+code)
            return code;
        },
        getCodeClick(){
            console.log(this.phone)
            if(this.checkPhone(this.phone)){
                console.log(this.phone)
            }else{
                toast({text:'请输入正确的手机号'})
            }
        },
        bindPhoneClick(){
            this.showbind = false
            if(this.checkPhone(this.phone)){
                if(this.code.length>0){
                    //绑定手机号
                }
            }else{
                toast({text:'请输入正确的手机号'})
            }
        },
        checkPhone(phone){
            return (/^[1][3,4,5,6,7,8][0-9]{9}$/.test(phone))
        }
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