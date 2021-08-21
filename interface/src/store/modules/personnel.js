import axios from "axios";
const baseUrl = "http://localhost:3001/personnel";

const state = {
  personnel: [],
};

const getters = {
  allPersonnel: (state) => state.personnel,
};
const actions = {
  getPersonnel: async ({ commit }) => {
    const response = await axios.get(`${baseUrl}`);

    if (response.status === 200) {
      commit("personnelLoaded", response.data);
    }
  },

  addPersonnel: async ({ commit }, newPersonnel) => {
    const response = await axios.post(`${baseUrl}/create`, newPersonnel, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      commit("personnelAdded", response.data);
    }
  },
  removeEmploye: async ({ commit }, newPersonnel) => {
    const response = await axios.post(`${baseUrl}/create`, newPersonnel, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      commit("personnelAdded", response.data);
    }
  },
};

const mutations = {
  personnelLoaded: (state, payload) => (state.personnel = payload),
  personnelAdded: (state, payload) => state.personnel.push(payload),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
