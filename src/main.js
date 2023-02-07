import Vue from 'vue'
import '@/utils/element.js'
import '@/style/element-variables.scss'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
