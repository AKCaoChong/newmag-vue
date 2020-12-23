export default{
    inserted: function(el, binding){
        if(typeof binding.value !== 'function'){
            throw 'callback must be a function'
        }
        let timer = null
        const handler = () => {
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                binding.value()
            }, 500);
        }
        el.addEventListener('click',handler)
        el.addEventListener('keyup',handler)
    }
}