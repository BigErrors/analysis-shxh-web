import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/axios.js'
import 'vue-g2'
import 'vue-mapboxgl-components'
import 'vue-mapboxgl-components/lib/vue-mapboxgl-components.css'
import './plugins/element'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
