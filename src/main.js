import Vue from "vue";
import App from "./views/index";
import "@/assets/css/index.css";

new Vue({
  el: "#app",
  render: h => h(App)
}).$mount('#app');
