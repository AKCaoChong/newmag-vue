export default{
    bind: function(el, binding){
        if(typeof binding.value !== 'function'){
            throw 'callback must be a function'
        }
        // 定义处理函数
        const handler = (e) => {
            binding.value(e)
        }
        let pressTimer = null
        // 计时器 2秒后执行函数
        let start = (e) => {
            // e.button === 0 左键点击 1 中键点击 2右键点击
            if(e.type ==='click' && e.button !== 0){
                return
            }
            if(pressTimer == null){
                pressTimer = setTimeout(() => {
                    handler()
                }, 2000);
            }
        }
        // 取消计时器
        let cancel = () => {
            if(pressTimer !== null){
                clearTimeout(pressTimer)
                pressTimer = null
            }
        }
        // 添加事件监听器
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)
        // 取消计时器
        el.addEventListener('click', cancel)
        el.addEventListener('mouseout', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
    },
    // 当传进来的值更新的时候触发
    componentUpdated(el,{value}){
        el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el){
        el.removeEventListener('click',el.handler)
    }
}