import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueAxios } from './utils/axios'

import './styles/index.scss' // global css
import './icons' // icons

Vue.config.productionTip = false

Vue.use(VueAxios)

Vue.use(Meta)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
