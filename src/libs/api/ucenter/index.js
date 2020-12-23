import service from '../../http'
const ucenter = {
    activeReadCode(data){
        return service.post('ezine/api/readcode/activate',data)
    },
    getMyMagazine(data){
        return service.post('ezine/api/mine/magazine',data)
    },
    getMyReadCode(data){
        return service.post('ezine/api/mine/readcode',data)
    },
    getMyCollect(data){
        return service.post('ezine/api/mine/collect',data)
    },
    getMyAddress(data){
        return service.post('ezine/api/mine/addressList',data)
    },
}

export default ucenter