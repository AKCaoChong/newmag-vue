
const state = {
    minemag: ""
};

const actions = {

};

const mutations = {
    setminemag(state,payload){
        console.log(payload)
        state.minemag = payload 
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}