import Vue from "vue";
import VueSource from "unplugin-vue-source/vue";
import "./style.css";
import App from "./App.vue";

Vue.use(VueSource);

new Vue({
  el: "#root",
  render: (h) => h(App),
});
