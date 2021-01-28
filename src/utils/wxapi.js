import wx from 'weixin-js-sdk'
import api from "../libs/api";
import toast from '../components/toast'
const ShareImpl = function (option) {
    //option是分享的配置内容*/
    const url = window.location.href.split("#")[0];
    window.console.log(url, JSON.stringify(option));
    //获取微信配置信息
    //encodeURIComponent(url)
    let params = {
        url: url
    }
    api.login.getWxConfig(params).then(response=>{
        console.log(response)
        wx.config({
            debug: false,
            appId: response.data.appid,
            timestamp: response.data.timestamp,
            nonceStr: response.data.nonceStr,
            signature: response.data.signature,
            jsApiList: [
                'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
                'onMenuShareWeibo',
                'chooseWXPay'
            ],
            openTagList: ['wx-open-launch-weapp']
        });
    }).catch(error => {
        window.console.log(error);
    });
    // 分享信息
    var shareInfo = {
        title: option.shareTitle, 	// 分享标题
        desc : option.shareDesc,
        link: option.shareUrl, // 分享链接
        imgUrl: option.shareImg, // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
            toast({text:'分享成功'});	
        }
    }
    wx.ready(res => {
        console.log('wxready'+res)
        wx.checkJsApi({
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'chooseWXPay'
            ],
            success: res => {
                console.log('checked api:', res)
            },
            fail: err => {
                console.log('check api fail:', err)
            }
        })
        console.log('config',shareInfo)
        wx.onMenuShareTimeline(shareInfo);		
        wx.onMenuShareAppMessage(shareInfo);
        wx.onMenuShareQQ(shareInfo);
        wx.onMenuShareWeibo(shareInfo);
    })
}

export default ShareImpl