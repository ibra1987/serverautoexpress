import axios from "axios";
import moment from "moment";

const baseUrl = "http://localhost:3001/candidates";
const state = {
  candidates: [],
};

const getters = {
  allCandidates: (state) => (auto) => {
    let newState = [];
    state.candidates.map((candidate) => {
      if (candidate.autoEcole === auto) newState.unshift(candidate);
    });

    return newState;
  },

  singleCandidate: (state) => (id) =>
    state.candidates.find((candidate) => candidate._id === id),

  candidatesSemaine: (state) => {
    //let currentDate = moment();

    state.candidates.map((candidate) => {
      console.log(moment(candidate.dateEntree).format("DD"));
    });
  },
};

const actions = {
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
};

export default {
  state,
  actions,
  mutations,
  getters,
};
