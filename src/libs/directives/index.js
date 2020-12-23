import copy from './copy'
import longPress from './longpress'
import debounce from './debounce'
const directives = {
    copy,
    longPress,
    debounce
}

export default{
    install(vue){
        Object.keys(directives).forEach((key) => {
            vue.directive(key,directives[key])
        })
    }
}