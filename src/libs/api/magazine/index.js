import service from '../../http'
const magazine = {
    getMagazineList(data){
        console.log(data)
        return service.post('ezine/api/whole/list',data)
    },
    searchMagazine(data){
        console.log(data)
        return service.post('ezine/api/whole/search',data)
    },
    getSearchTagList(data){
        console.log(data)
        return service.post('ezine/api/whole/push',data)
    },
    getMagazineDetail(data){
        console.log(data)
        return service.post('ezine/api/whole/details',data)
    },
    collectMagazine(data){
        console.log(data)
        return service.post('ezine/api/whole/collect',data)
    },
    getMagazineType(data){
        console.log(data)
        return service.post('ezine/api/whole/zinetype',data)
    },
    buyMagazine(data){
        console.log(data)
        return service.post('ezine/api/h5/pay',data)
    }
}

export default magazine