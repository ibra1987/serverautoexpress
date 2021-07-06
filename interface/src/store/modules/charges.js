import axios from "axios";
const baseUrl = "http://localhost:3001/charges";

const state = {
  charges: [],
};

const getters = {
  allCharges: (state) => state.charges,
  getCurrentMonthCharges: (state) => (month, year) => {
    return state.charges.filter(
      (monthCharges) =>
        monthCharges.dateCharge.Month === String(month) &&
        monthCharges.dateCharge.Year === String(year)
    );
  },
};
const actions = {
  getCharges: async ({ commit }) => {
    const response = await axios.get(`${baseUrl}`);

    if (response.status === 200) {
      commit("chargesLoaded", response.data);
    }
  },
  addCharge: async ({ commit }, charge) => {
    const response = await axios.post(`${baseUrl}/create`, charge, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    commit("chargeAdded", response.data);
  },
  remove: async ({ commit }, id) => {
    try {
      axios.delete(`${baseUrl}/${id}`);
      commit("chargeDeleted", id);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  chargesLoaded: (state, payload) => (state.charges = payload),
  chargeAdded: (state, payload) => state.charges.unshift(payload),
  chargeDeleted: (state, payload) =>
    (state.charges = state.charges.filter((charge) => charge._id !== payload)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
