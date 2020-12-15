import axios from 'axios'
import toast from '../components/toast'

const DEV_BASE_URL = "";
const DEBUG_BASE_URL = "";
const PRO_BASE_URL = "";
// 创建 axios 实例
const service = axios.create({
    // 配置项
    headers:{
        get:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post:{
            'Content-Type': 'application/json;charset=utf-8'
        }
    },
    // 跨域请求是否需要使用凭证
    withCredentials: true,
    timeout: 10000
})

if(process.env.NODE_ENV === 'development'){
    service.defaults.baseURL = DEV_BASE_URL
}else if(process.env.NODE_ENV === 'debug'){
    service.defaults.baseURL = DEBUG_BASE_URL
}else if(process.env.NODE_ENV === 'production'){
    service.defaults.baseURL = PRO_BASE_URL
}

service.interceptors.request.use(
    config =>{
        const token = ''
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        console.log(error)
        return Promise.error(error)
    }
)

const errorHandler = status => {
    console.log(this)
    switch(status){
        case 400:
            toast({
                text:'400',
            })
            break
        case 401:
            toast({
                text:'401',
            })
            break
        case 404:
            toast({
                text:'404',
            })
            break
        case 500:
            toast({
                text:'500',
            })
            break
        default:
            toast({
                text:'连接错误',
            })
            break
    }
}


service.interceptors.response.use( 
    response => {
        if(response.status === 200){
            return Promise.resolve(response)
        }else{
            return Promise.reject(response)
        }
    },
    error => {
        console.log(error.response.status)
        errorHandler(error.response.status)
        return Promise.reject(error)
    }
)

export default service