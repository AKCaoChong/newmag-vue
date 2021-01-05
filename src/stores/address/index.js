
const state = {
    selAddress: {},
    selAddressStr:""
};

const actions = {

};

const mutations = {
    setSelAddress(state,payload){
        let addressStr = JSON.stringify(payload)
        console.log(addressStr)
        sessionStorage.setItem('selAddress',addressStr)
        state.selAddressStr = sessionStorage.getItem('selAddress')
        state.selAddress = payload 
    },
    clearSelAddress(state){
        state.selAddress = null,
        state.selAddressStr = ""
        sessionStorage.removeItem('selAddress')
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}