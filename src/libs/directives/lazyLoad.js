const LazyLoad = {
    inatall(Vue,options){
        const defaultSrc = options.default //默认的占位图
        Vue.directive('lazy',{
            bind(el,binding){
               LazyLoad.init(el,binding.value,defaultSrc)
            },
            inserted(el){
                if(IntersectionObserver){
                    // 支持观察器实例 使用观察器
                    LazyLoad.createInterSectionObserver(el)
                }else{
                    //不支持 使用监听scroll
                }
            }
        })
    },
    init(el,val,def){
        el.setAttribute('data-src',val)
        el.setAttribute('src',def)
    },
    // 创建观察器实例 并观察对应的element
    createInterSectionObserver(el){
        let io = new IntersectionObserver((entries)=>{
            const realSrc = el.dataset.src
            if(entries[0].isIntersecting){
                el.src = realSrc
                el.removeAttribute('data-src')                
            }
        })
        io.observe(el)
    },
    // 监听scroll事件
    listenerScroll(el){
        const handler = LazyLoad.throttle(LazyLoad.load,300)
        LazyLoad.load(el)
        window.addEventListener('scroll',()=>{
            handler(el)
        })
    },
    //j加载真实图片
    load(el){
        const windowHeight = document.documentElement.clientHeight
        const elTop = el.getBoundingClientRect().top
        const elBottom = el.getBoundingClientRect().bottom
        const realSrc = el.dataset.src
        if(elTop - windowHeight < 0 && elBottom > 0){
            if(realSrc){
                el.src = realSrc
                el.removeAttribute('data-src')
            }
        }

    },
    // 节流
    throttle(fn,delay){
        let timer
        let prevTime
        return function(...args){
            const currTime = Date.now()
            const context = this;
            if(!prevTime){
                prevTime = currTime
            }
            clearTimeout(timer)
            if(currTime - prevTime > delay){
                prevTime = currTime
                fn.apply(context,args)
                clearTimeout(timer)
                return
            }
            timer = setTimeout(() => {
                prevTime = Date.now()
                timer = null
                fn.apply(context,args)
            }, delay);
        }
    }

}

export default LazyLoad