const state = {
  autoEcole: "Akka",
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
