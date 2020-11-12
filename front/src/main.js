import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueCookie from "vue-cookie";
import axios from "axios";
import Vue2TouchEvents from 'vue2-touch-events'
 
import io from 'socket.io-client';
// const socket = io('http://k3a507.p.ssafy.io:3000');
const socket = io('http://localhost:3000');

//Initialize socket
Vue.prototype.$socket = socket;

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(VueCookie);
Vue.use(Vue2TouchEvents)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
