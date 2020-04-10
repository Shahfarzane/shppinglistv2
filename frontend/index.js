import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './routes'
import { store } from './store'

Vue.use(Vuetify)
Vue.use(VueRouter)


Vue.config.productionTip = false

var app = new Vue({
  el: "#app",
  router,
  store,
  render: function (h) { return h(App) },
  template: '<App/>',
  components: { App }
});