import axios from "axios";
const baseUrl = "/api/autoecoles";

const state = {
  autoEcoles: [],
  selectedOne: "Akka",
  benefices: 0,
  authenticated: false,
};

const getters = {
  selectedAuto: (state) => state.selectedOne,
  allAutoEcoles: (state) => state.autoEcoles,
  isAuthenticated: (state) => state.authenticated,
};
const actions = {
  login: ({ commit }) => {
    commit("loggedIn");
  },
  selectNewAuto: ({ commit }, newAuto) => {
    commit("newAutoSelected", newAuto);
  },
  getAutoEcoles: async ({ commit }) => {
    const response = await axios.get(`${baseUrl}`);

    if (response.status === 200) {
      commit("autoEcolesLoaded", response.data);
    }
  },

  addNewAutoEcole: async ({ commit }, newAuto) => {
    const response = await axios.post(`${baseUrl}/create`, newAuto, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      commit("newAutoEcoleAdded", newAuto);
    }
  },
};

const mutations = {
  newAutoSelected: (state, newAuto) => (state.selectedOne = newAuto),
  autoEcolesLoaded: (state, payload) => (state.autoEcoles = payload),
  newAutoEcoleAdded: (state, newAuto) => state.autoEcoles.push(newAuto),
  loggedIn: (state) => (state.authenticated = true),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
