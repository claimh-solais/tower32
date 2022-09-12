import Vue from 'vue'
import Vuex from 'vuex'
// import cart from './modules/cart'
import category from './store/modules/category'
import { createLogger } from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    // cart,
    category,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: { },
  mutations: { },
  actions: { },
})
