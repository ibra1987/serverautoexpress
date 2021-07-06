import Vuex from "vuex";
import candidates from "./modules/candidates";
import charges from "./modules/charges";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    candidates,
    charges,
  },
});

export default store;
