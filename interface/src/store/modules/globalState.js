const state = {
  autoEcole: "Akka",
  benefices: 0,
};

const getters = {
  selectedAuto: (state) => state.autoEcole,
};
const actions = {
  selectNewAuto: ({ commit }, newAuto) => {
    commit("newAutoSelected", newAuto);
  },
};

const mutations = {
  newAutoSelected: (state, newAuto) => (state.autoEcole = newAuto),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
