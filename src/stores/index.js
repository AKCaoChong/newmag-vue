import Vue from 'vue'
import Vuex from 'vuex'
import ucenter from './ucenter'
import address from './address'
import share from './share'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ucenter,
    address,
    share
  }
})
