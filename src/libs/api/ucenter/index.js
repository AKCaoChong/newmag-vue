import service from '../../http'
const ucenter = {
    activeReadCode(data){
        console.log(data)
        return service.post('ezine/api/readcode/activate',data)
    },
    getMyMagazine(data){
        console.log(data)
        return service.post('ezine/api/mine/magazine',data)
    },
    getMyReadCode(data){
        console.log(data)
        return service.post('ezine/api/mine/readcode',data)
    },
    getMyCollect(data){
        console.log(data)
        return service.post('ezine/api/mine/collect',data)
    },
    getMyAddress(data){
        console.log(data)
        return service.post('ezine/api/mine/addressList',data)
    },
}

export default ucenter