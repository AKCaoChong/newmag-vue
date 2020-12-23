import service from '../../http'
const home = {
    getCampaign(data){
        console.log(data)
        return service.post('ezine/api/index/campaign',data)
    },
    getHomeMagazine(data){
        return service.post('ezine/api/index/magazine',data)
    },
    
}

export default home