import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Router from "./router";
import Store from "./store";
import vueMoment from "vue-moment";
import VueCookies from "vue-cookies";
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(vueMoment);
Vue.use(VueCookies);

new Vue({
  render: (h) => h(App),
  router: Router,
  store: Store,
}).$mount("#app");
