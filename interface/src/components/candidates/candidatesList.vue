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

      <div>
        Candidats ayant paye : <span class="paye"> {{ paye }}</span>
      </div>
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
            parseInt(candidate.Price) === sumAvances(candidate.Avances)
              ? 'paid'
              : ''
          "
        >
          <td>{{ order(candidates, candidate) }}</td>
          <td>{{ candidate.Fname }} {{ candidate.Lname }}</td>
          <td>{{ candidate.Cin }}</td>
          <td>{{ candidate.Categorie }}</td>
          <td>
            {{ candidate.Price }}
          </td>
          <td>
            <span
              :class="
                candidate.Price === sumAvances(candidate.Avances)
                  ? 'paid'
                  : 'avance'
              "
              @click="manageAvances(candidate._id)"
            >
              {{ candidate.Avances.length ? sumAvances(candidate.Avances) : 0 }}
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
    <div class="chargement" v-if="chargement">chargement ...</div>

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
      limit: 8,
      chargement: false,
    };
  },

  computed: {
    ...mapGetters(["allCandidates", "selectedAuto", "paid"]),
    candidates() {
      return this.allCandidates(this.autoEcole, this.limit);
    },
    autoEcole() {
      return this.selectedAuto;
    },

    paye() {
      return ` ${this.paid(this.selectedAuto)} / ${this.candidates.length}`;
    },
  },

  methods: {
    parseInt(x) {
      return parseInt(x);
    },
    sumAvances(arr) {
      return arr.reduce((sum, value) => {
        if (value.Montant > 0) {
          return parseInt(sum) + parseInt(value.Montant);
        }
        return 0;
      }, 0);
    },
    triggerAvanceModal() {
      this.showAvance = !this.showAvance;
    },
    manageAvances(id) {
      this.showAvance = !this.showAvance;
      this.id = id;
    },

    onscroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.chargement == true;
        this.limit += 10;

        this.chargement == false;
        this.allCandidates(this.selectedAuto, this.limit);
      }
    },

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

  mounted() {
    window.addEventListener("scroll", this.onscroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onscroll);
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
.paye {
  display: inline-block;
  padding: 0.3em 0.8em;
  background-color: crimson;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
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
  width: 85%;
  display: flex;
  justify-content: space-between;
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

/* th {
  background-color: #292b2c;
  color: rgb(255, 255, 255);
  border-left: 1px solid white;
} */
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
