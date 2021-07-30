import axios from "axios";
const baseUrl = "http://localhost:3001/echeances";

const state = {
  echeances: [],
};

const getters = {
  allEcheances: (state) => (auto) =>
    state.echeances.filter((echeance) => echeance.autoEcole === auto),
};
const actions = {
  getEcheances: async ({ commit }) => {
    const response = await axios.get(`${baseUrl}`);

    commit("echeancesLoaded", response.data);
  },
  createEcheance: async ({ commit }, newEcheance) => {
    const response = await axios.post(`${baseUrl}/create`, newEcheance, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    commit("newEcheanceAdded", response.data);
  },
  removeEcheance: async ({ commit }, id) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete/${id}`);

      commit("echeanceDeleted", response.data._id);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  echeancesLoaded: (state, payload) => (state.echeances = payload),
  newEcheanceAdded: (state, newEcheance) =>
    state.echeances.unshift(newEcheance),
  echeanceDeleted: (state, id) =>
    (state.echeances = state.echeances.filter(
      (echeance) => echeance._id !== id
    )),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
