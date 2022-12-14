import axios from "axios";
const baseUrl = "/api/vehicules";

const state = {
  vehicules: [],
};

const getters = {
  allVehicules: (state) => (auto) =>
    state.vehicules.filter((vehicule) => vehicule.autoEcole === auto),
};

const actions = {
  getVehicules: async ({ commit }) => {
    const response = await axios.get(`${baseUrl}`);

    commit("vehiculesLoaded", response.data);
  },

  addNewVehicule: async ({ commit }, newVehicule) => {
    const response = await axios.post(`${baseUrl}/create`, newVehicule, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    commit("vehiculeAdded", response.data);
  },

  removeVehicule: async ({ commit }, id) => {
    await axios.delete(`${baseUrl}/delete/${id}`);
    commit("vehiculeRemoved", id);
  },
};

const mutations = {
  vehiculesLoaded: (state, payload) => (state.vehicules = payload),
  vehiculeAdded: (state, payload) => state.vehicules.unshift(payload),
  vehiculeRemoved: (state, payload) =>
    (state.vehicules = state.vehicules.filter(
      (vehicule) => vehicule._id !== payload
    )),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
