export default {
    inserted: function(el,binding){
        //获取权限的值
        let permission = binding.value
        if(permission){
            let hasPermission = checkArray(permission)
            if(!hasPermission){
                // 没有权限 移除DOM元素
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    }
}
// 自定义权限数组 arr 判断用户的权限是否在这个数组内 如果是则显示 否则移除Dom
function checkArray(key){
    let arr = ['1','2','3','5']
    let index = arr.indexOf(key)
    if(index > -1){
        return true
    }else{
        return false
    }
}

