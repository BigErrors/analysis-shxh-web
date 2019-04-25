import Vue from 'vue'
import Vuex from 'vuex'
import mediationStore from './modules/mediationStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mediationStore: mediationStore
  }
})
