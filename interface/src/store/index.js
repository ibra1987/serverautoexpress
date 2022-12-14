import Vuex from "vuex";
import candidates from "./modules/candidates";
import charges from "./modules/charges";
import vehicules from "./modules/vehicules";
import echeances from "./modules/echeances";
import globalState from "./modules/globalState";
import personnel from "./modules/personnel";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    candidates,
    charges,
    vehicules,
    echeances,
    globalState,
    personnel,
  },
});

export default store;
