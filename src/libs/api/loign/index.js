import service from '../../http'
const login = {
    getLogin(data){
        console.log(data)
        return service.post('ezine/api/wap/login',data)
    },
    getWxConfig(data){
        return service.post('ezine/api/wap/forward',data)
    },
    bindPhone(data){
        return service.post('ezine/api/wap/phone',data)
    },
    getValidateCode(data){
        return service.post('ezine/api/validate/send',data)
    },
    getSmsCode(data){
        return service.post('ezine/api/sms/send',data)
    }
}

export default login