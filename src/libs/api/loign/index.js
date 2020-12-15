import service from '../../http'
const login = {
    getLogin(data){
        console.log(data)
        return service.post('api/',data)
    }
}

export default login