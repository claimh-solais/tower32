import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default {
  default: new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/*',
        name: 'DefaultView',
        component: () => import(/* webpackChunkName: "default" */ './views/Default.vue'),
      },
    ]
  }),
}
