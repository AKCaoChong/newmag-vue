import toastComponent from './toast.vue'
import vue from 'vue'

const ToastConstructor = vue.extend(toastComponent)
function showToast({text, type, duration = 2000}){
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data(){
            return{
                isShow: true,
                text: text,
                type: type,
                showContent: true
            }
        }
    })
    document.body.appendChild(toastDom.$el)
    // isShow为false之前 先做完showContent 的动画
    setTimeout(() => {
        toastDom.showContent = false
    }, duration - 1250);
    setTimeout(() => {
        toastDom.isShow = false
    }, duration);
    
}

// function registerToast(){
//     vue.prototype.$toast = showToast
// }

export default showToast