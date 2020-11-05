import Vue from 'vue'
import App from './App.vue'
import './../node_modules/bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import moment from 'moment'
import 'chart.js'
import VueGeolocation from 'vue-browser-geolocation';
import VueCarousel from 'vue-carousel';
 
Vue.use(VueCarousel);
Vue.use(VueGeolocation);
Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
