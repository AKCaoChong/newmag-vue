import toast from '../../components/toast'
export default{
    bind(el,{value}){
        el.$value = value
        el.handler = () => {
            if(!el.$value){
                console.log('复制的内容为空')
                return
            }
            const textarea = document.createElement('textarea')
            // 设置只读不可编辑 防止点击弹出键盘
            textarea.readOnly = 'readonly'
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            // 将需要copy的值赋给 textarea.value 
            textarea.value = el.$value
            document.body.appendChild(textarea)
            // 选中并复制
            textarea.select()
            const result = document.execCommand('copy')
            if(result){
                toast({
                    text:'复制成功'
                })
            }
            document.body.removeChild(textarea)
        }
        el.addEventListener('click',el.handler)
    },
    // 值改变就需要触发
    componentUpdated(el,{value}){
        el.$value = value
    },
    // 解除绑定时需要移除事件监听
    unbind(el){
        el.removeEventListener('click',el.handler)
    }

}