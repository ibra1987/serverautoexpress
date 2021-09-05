import axios from "axios";
import moment from "moment";

const baseUrl = "/api/candidates";
const state = {
  candidates: [],
  Avances: [],
};

const getters = {
  allCandidates: (state) => (auto, limit) => {
    let newState = [];
    state.candidates.map((candidate) => {
      if (candidate.autoEcole === auto) newState.unshift(candidate);
    });

    return newState.slice(0, limit);
  },

  paid: (state) => (auto) => {
    const paid = state.candidates.filter((candidate) => {
      return (
        candidate.autoEcole === auto &&
        parseInt(candidate.Price) ===
          candidate.Avances.reduce((sum, value) => {
            if (value.Montant > 0) {
              return parseInt(sum) + parseInt(value.Montant);
            }
            return 0;
          }, 0)
      );
    });

    return paid.length;
  },
  allAvances: (state) => state.Avances,

  singleCandidate: (state) => (id) =>
    state.candidates.find((candidate) => candidate._id === id),

  candidatesSemaine: (state) => (auto) => {
    let newArray = [];
    state.candidates.map((candidate) => {
      if (
        candidate.autoEcole === auto &&
        moment(candidate.dateEntree).isoWeek() === moment().isoWeek()
      ) {
        newArray.push(candidate);
      }
    });
    return newArray.length;
  },

  candidatesMonth: (state) => (auto) => {
    let newArray = [];
    state.candidates.map((candidate) => {
      if (
        candidate.autoEcole === auto &&
        moment(candidate.dateEntree).format("MM") === moment().format("MM")
      ) {
        newArray.push(candidate);
      }
    });
    return newArray.length;
  },
  candidatesYear: (state) => (auto) => {
    let newArray = [];
    state.candidates.map((candidate) => {
      if (
        candidate.autoEcole === auto &&
        moment(candidate.dateEntree).format("YYYY") === moment().format("YYYY")
      ) {
        newArray.push(candidate);
      }
    });
    return newArray.length;
  },

  encaisseThisWeek: (state) => {
    //let avances = [];

    let avances = [];
    state.Avances.map((candidateAvances) => {
      candidateAvances.Avances.map((av) => {
        if (
          moment(av.dateAvance).isoWeek() === moment().isoWeek() &&
          av.Montant != null
        ) {
          avances.push(av.Montant);
        }
      });
    });

    return avances.reduce((tot, next) => parseInt(tot) + parseInt(next), 0);

    // return weekAvances.reduce((tot, next) => {
    //   parseInt(tot) + parseInt(next.Montant);
    // }, 0);
  },

  encaisseThisMonth: (state) => {
    let avances = [];
    state.Avances.map((candidateAvances) => {
      candidateAvances.Avances.map((av) => {
        if (
          moment(av.dateAvance).format("MM") === moment().format("MM") &&
          av.Montant != null
        ) {
          avances.push(av.Montant);
        }
      });
    });

    return avances.reduce((tot, next) => parseInt(tot) + parseInt(next), 0);
  },
  encaisseThisYear: (state) => {
    let avances = [];
    state.Avances.map((candidateAvances) => {
      candidateAvances.Avances.map((av) => {
        if (
          moment(av.dateAvance).format("YYYY") === moment().format("YYYY") &&
          av.Montant != null
        ) {
          avances.push(av.Montant);
        }
      });
    });

    return avances.reduce((tot, next) => parseInt(tot) + parseInt(next), 0);
  },
};

const actions = {
  getAllAvances: async ({ commit }, auto) => {
    try {
      const response = await axios.get(`${baseUrl}/avances/${auto}`);

      if (response.status === 200) commit("avancesLoaded", response.data);
    } catch (error) {
      console.log(error.message);
    }
  },
  // get all recors
  getCandidates: async ({ commit }) => {
    const response = await axios.get(`${baseUrl}`);

    if (response.status === 200) {
      commit("candidatesFetched", response.data);
    }
  },

  //get single record

  addCandidate: async ({ commit }, candidate) => {
    const response = await axios.post(`${baseUrl}/create`, candidate, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    commit("candidateAdded", response.data);
  },

  //

  //update a record

  updateCandidate: async ({ commit }, candidate) => {
    await axios.post(`${baseUrl}/update/${candidate._id}`, candidate, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    commit("candidateUpdated", candidate);
  },

  // delete a record

  removeCandidate: async ({ commit }, id) => {
    const response = await axios.delete(`${baseUrl}/delete/${id}`);

    if (response.status === 200) {
      commit("candidateDeleted", id);
    }
  },

  getCandidateAvances: async ({ commit }, id) => {
    await commit("candidateAvancesRequired", id);
  },

  deleteAvance: async ({ commit }, payload) => {
    const response = await axios.delete(
      `${baseUrl}/avance/delete/${payload.cid}/${payload.avid}`
    );

    commit("avanceRemoved", response.data);
    return true;
  },
};

const mutations = {
  candidatesFetched: (state, payload) => (state.candidates = payload),
  candidateDeleted: (state, payload) =>
    (state.candidates = state.candidates.filter(
      (candidate) => candidate._id != payload
    )),
  candidateAdded: (state, payload) => state.candidates.unshift(payload),
  candidateUpdated: (state, payload) =>
    (state.candidates = state.candidates.map((candidate) => {
      if (candidate._id === payload._id) {
        return Object.assign({}, candidate, payload);
      }
      return candidate;
    })),
  avanceAdded: (state, payload) => {
    state.candidates = state.candidates.map((candidate) => {
      if (candidate._id === payload.id) {
        candidate.Avances.push(payload.avance);
      }
      return candidate;
    });
  },

  avanceRemoved: (state, payload) => {
    state.candidates = state.candidates.map((candidate) => {
      if (candidate._id === payload.cid) {
        candidate.Avances.filter((avance) => {
          avance._id !== payload.avid;
        });
      }
      return candidate;
    });
  },

  avancesLoaded: (state, avances) => (state.Avances = avances),
};

export default {
  state,
  actions,
  mutations,
  getters,
};
