const state = {
    shareDesc: ''
}

const actions = {

}

const mutations = {
    setShareDesc(state,payload){
        state.shareDesc = payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}