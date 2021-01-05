import copy from './copy'
import longPress from './longpress'
import debounce from './debounce'
import emoji from './emoji'
import permision from './permission'
import waterMaker from './waterMaker'
import draggable from './draggable'
const directives = {
    copy,
    longPress,
    debounce,
    emoji,
    permision,
    waterMaker,
    draggable
}

export default{
    install(vue){
        Object.keys(directives).forEach((key) => {
            vue.directive(key,directives[key])
        })
    }
}