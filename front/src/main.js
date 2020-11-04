import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueCookie from "vue-cookie";
import axios from "axios";

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(VueCookie);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')