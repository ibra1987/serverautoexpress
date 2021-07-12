import axios from "axios";
const baseUrl = "http://localhost:3001/echeances";

const state = {
  echeances: [],
};

const getters = {
  allEcheances: (state) => state.echeances,
};
const actions = {
  getEcheances: async ({ commit }) => {
    const response = await axios.get(`${baseUrl}`);

    commit("echeancesLoaded", response.data);
  },
};

const mutations = {
  echeancesLoaded: (state, payload) => (state.echeances = payload),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
