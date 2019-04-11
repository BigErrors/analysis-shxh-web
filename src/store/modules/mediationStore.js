const state = {
  mediationDisplay: false
}

const getters = {
  mediationDisplay (state) {
    return state.mediationDisplay
  }
}
const mutations = {
  changeMediaDisplayStatus (state) {
    state.mediationDisplay = !state.mediationDisplay
  }
}

const actions = {
  isDisplayMedia (ctx) {
    ctx.commit('changeMediaDisplayStatus')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
