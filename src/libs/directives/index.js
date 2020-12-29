import copy from './copy'
import longPress from './longpress'
import debounce from './debounce'
import emoji from './emoji'
import permision from './permission'
import waterMaker from './waterMaker'
const directives = {
    copy,
    longPress,
    debounce,
    emoji,
    permision,
    waterMaker
}

export default{
    install(vue){
        Object.keys(directives).forEach((key) => {
            vue.directive(key,directives[key])
        })
    }
}