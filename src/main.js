import Vue from "vue";
import App from "./App";
import "@/assets/css/index.css";
import router from './router'
import store from './vuex'

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount('#app');
