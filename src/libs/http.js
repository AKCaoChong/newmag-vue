import axios from 'axios'
import toast from '../components/toast'
import qs from 'qs'
import auth from '../utils/auth'
const DEV_BASE_URL = "/dev_url";
const DEBUG_BASE_URL = "https://zine.raylimobile.com/";
const PRO_BASE_URL = "https://zine.raylimobile.com/";
// 创建 axios 实例
const service = axios.create({
    // 配置项  'Content-Type': 'application/json;charset=utf-8'   'Content-Type': 'multipart/form-data'
    headers:{
        get:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
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
        if (config.method  === 'post') {
            try {
                config.data.token = auth.getToken()
            } catch (error) {
                console.log(error.message)
            }
            config.data = qs.stringify(config.data)
        }
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
        case 407:
            toast({
                text:'没有数据',
            })
            break
        case 500:
            toast({
                text:'500',
            })
            break
       
    }
}


service.interceptors.response.use( 
    response => {
        console.log('==response==:'+response)
        if(response.status === 200){
            errorHandler(response.data.code)
            return Promise.resolve(response.data)
        }else{
            errorHandler(response.data.code)
            return Promise.reject(response)
        }
    },
    error => {
        console.log('error' + error)
        errorHandler(error.response.status)
        return Promise.reject(error)
    }
)

export default service