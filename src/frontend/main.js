import _ from 'lodash'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './directives/index'

import vuetify from '@/plugins/vuetify'

const _initApp = function () {
  Vue.config.productionTip = false

  Object.defineProperty(Vue.prototype, '_', { value: _ })

  if (document.getElementById('app')) {
    new Vue({
      vuetify,
      router: router.default,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
}
document.readyState !== 'complete' ? window.addEventListener("load", _initApp.bind(this)) : _initApp()
