<template>
  <div class="candidatesContainer">
    <div class="btnContainer">
      <router-link to="/candidates/create">
        <submit-button
          v-on:click.native="showForm"
          :btnText="'Ajouter'"
          v-if="!editForm && !addForm"
        />
      </router-link>
    </div>
    <add-candidate v-on:hideme="showForm" v-show="addForm" />
    <!-- <edit-candidate v-if="editForm" @hideEdit="showEditForm" /> -->

    <table v-show="!addForm">
      <thead>
        <tr>
          <th>N°</th>
          <th>Nom du candidat</th>
          <th>N° de CIN</th>
          <th>Catégorie</th>
          <th>Prix</th>
          <th>Somme des avances</th>
          <th>Opérations</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="candidate in candidates"
          :key="candidate._id"
          :class="
            candidate.Price ===
            candidate.Avances.reduce((sum, value) => {
              return sum + parseInt(value.Montant);
            }, 0)
              ? 'paid'
              : ''
          "
        >
          <td>{{ order(candidates, candidate) }}</td>
          <td>{{ candidate.Fname }} {{ candidate.Lname }}</td>
          <td>{{ candidate.Cin }}</td>
          <td>{{ candidate.Categorie }}</td>
          <td
            :class="
              candidate.Price ===
              candidate.Avances.reduce((sum, value) => {
                return sum + parseInt(value.Montant);
              }, 0)
                ? 'paid'
                : 'green'
            "
          >
            {{ candidate.Price }}
          </td>
          <td>
            <span
              :class="
                candidate.Price ===
                candidate.Avances.reduce((sum, value) => {
                  return sum + parseInt(value.Montant);
                }, 0)
                  ? 'paid'
                  : 'avance'
              "
              @click="manageAvances(candidate._id)"
            >
              {{
                candidate.Avances
                  ? candidate.Avances.reduce((sum, value) => {
                      return sum + parseInt(value.Montant);
                    }, 0)
                  : 0
              }}
            </span>
          </td>
          <td class="operationsContainer">
            <router-link :to="{ name: 'edit', params: { id: candidate._id } }">
              <i class="fas fa-user-edit"></i>
            </router-link>

            <i
              @click="confirmation(candidate._id)"
              class="fas fa-trash-alt"
            ></i>
          </td>
        </tr>
        <td></td>
      </tbody>
    </table>

    <Avances v-if="showAvance" @hideAvances="triggerAvanceModal" :id="id" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import submitButton from "../shared/submitButton.vue";
import addCandidate from "./addCandidate.vue";
// import editCandidate from "./editCandidate.vue";
import Avances from "../avances/Avances.vue";
export default {
  name: "candidatesList",
  components: {
    submitButton,
    addCandidate,
    // editCandidate,
    Avances,
  },

  data() {
    return {
      addForm: false,
      editForm: false,
      showAvance: false,
      id: "",
      sommeAvances: 0,
    };
  },

  computed: {
    ...mapGetters(["allCandidates", "selectedAuto"]),
    candidates() {
      return this.allCandidates(this.autoEcole);
    },
    autoEcole() {
      return this.selectedAuto;
    },
  },

  methods: {
    async triggerAvanceModal() {
      this.showAvance = !this.showAvance;
    },
    manageAvances(id) {
      this.showAvance = !this.showAvance;
      this.id = id;
    },

    //sum of avances foreach

    //show/hide Form

    showForm() {
      this.addForm = !this.addForm;
    },

    showEditForm() {
      this.editForm = !this.editForm;
    },
    //load candidates
    ...mapActions(["removeCandidate"]),
    //order  12 3....
    order(arr, item) {
      return Array.from(arr).indexOf(item) + 1;
    },

    //delete record
    confirmation(cid) {
      if (confirm("Voulez vous vraiment supprimer cet enregistrement?")) {
        this.removeCandidate(cid);
      }
    },
  },
};
</script>

<style scoped>
.paid {
  color: rgb(38, 143, 38) !important;
  text-decoration: line-through;
}

.pagination ul {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination ul li {
  padding: 5px 20px;
  font-weight: 0.9rem;
  cursor: pointer;
  border-left: 1px solid lightgrey;
}

.firstPageLi {
  border: none !important;
}
.green {
  color: green;
}
.annuler {
  background-color: red;
}
.btnContainer {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.candidatesContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avance {
  cursor: pointer;
  text-decoration: underline;
  color: rgb(9, 133, 138);
}
.annuler:hover {
  background-color: rgb(168, 168, 168);
}

table,
th,
td {
  border: none;
  border-collapse: collapse;
  text-align: center;
  padding: 1vh;
}

th {
  background-color: #292b2c;
  color: rgb(255, 255, 255);
  border-left: 1px solid white;
}
.operationsContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.fa-user-edit {
  color: #0275d8;
  cursor: pointer;
}
.fa-trash-alt {
  color: #d9534f;
  cursor: pointer;
}
</style>
