import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Router from "./router";
import Store from "./store";
import vueMoment from "vue-moment";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(vueMoment);

new Vue({
  render: (h) => h(App),
  router: Router,
  store: Store,
}).$mount("#app");
