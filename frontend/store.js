import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'my-app',
    storage: window.localStorage
  })

export const store = new Vuex.Store({
plugins: [vuexPersist.plugin],
  state: {
    notes: '',
    count: 0
  },
  mutations: {
    change(state, notes) {
      state.notes = notes
    },
    increment (state, payload){
      return state.count = state.count + payload.amount;
    },
    decrement (state, payload){
      return state.count = state.count - payload.amount;
    }
  },
  actions: {
  increment (context, payload) {
    context.commit('increment', payload)
  },
  decrement (context, payload) {
    context.commit('decrement', payload)
  }
},
  getters: {
    notes: state => state.notes
  }
})
