export default {
    bind: function(el){
        let regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
        let $inp = findELe(el, 'input')
        $inp.handle = function(){
            let val = $inp.value
            $inp.value = val.replace(regRule,'')
            trigger($inp,'input')
        }
        $inp.addEventListener('keyup',$inp.handle)
    },
    unbind: function(el){
        el.$inp.removeEventListener('keyup',el.$inp.handle)
    }
}

let findELe = (parent, type) => {
    return parent.nodeName.toLowerCase() === type ? parent : parent.querySelector(type)
}

const trigger = (el,ename) => {
    let e = document.createEvent('htmlEvents')
    e.initEvent(ename,true,true)
    el.dispatchEvent(e)
}