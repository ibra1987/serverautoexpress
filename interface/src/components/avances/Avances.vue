<template>
  <div class="avancesContainer">
    <div class="modal">
      <div class="title">
        <span @click="$emit('hideAvances')" class="exit">
          <h3>X</h3>
        </span>
        <h2>
          Ajouter une nouvelle Avance
        </h2>
      </div>
      <div class="avanceCandidate">
        <h1>{{ candidate.Fname }} {{ candidate.Lname }}</h1>
      </div>
      <div class="errorsContainer">
        <div
          class="errors"
          v-show="errors.length"
          v-for="error in errors"
          :key="error.index"
        >
          <ul>
            <li>{{ error }}</li>
          </ul>
        </div>

        <div
          class="success"
          v-show="success.length"
          v-for="successmsg in success"
          :key="successmsg.index"
        >
          <ul>
            <li>{{ successmsg }}</li>
          </ul>
        </div>
      </div>
      <div class="avancesTable">
        <table v-if="candidate.Avances.length">
          <thead>
            <th>
              Avance
            </th>
            <th>
              Date
            </th>
          </thead>
          <tbody>
            <tr v-for="Avance in candidate.Avances" :key="Avance.id">
              <td v-if="Avance.Montant > 0">
                {{ Avance.Montant }}
              </td>
              <td v-if="Avance.Montant > 0">
                {{ formatDate(Avance.dateAvance) }}
              </td>
              <td>
                <i
                  v-if="Avance.Montant > 0"
                  @click="confirmation(Avance._id)"
                  class="fas fa-trash-alt"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="addAvanceForm">
        <form method="post" @submit.prevent="addAvance">
          <input class="input" type="number" v-model="newAvance" />
          <submit-button class="input btn " :btnText="'Ajouter'" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import submitButton from "../shared/submitButton.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
//import moment from "moment";
export default {
  name: "Avances",
  props: ["id"],
  components: {
    submitButton,
  },

  data() {
    return {
      errors: [],
      success: [],
      newAvance: "",
      hoverd: false,
    };
  },

  methods: {
    ...mapActions(["addNewAvance", "deleteAvance", "getAllAvances"]),
    confirmation(cid) {
      if (confirm("Etes vous sur de vouloir supprimer?")) {
        this.removeAvance(cid);
      }
    },

    async addAvance() {
      if (this.newAvance == "" || isNaN(this.newAvance)) {
        if (!this.errors.length) {
          this.errors.push("L'avance doit etre un chiffre");
          return setTimeout(() => {
            this.errors = [];
          }, 4000);
        }
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/candidates/avances",

        {
          id: this.id,
          newAvance: this.newAvance,
        }
      );

      if (response.status === 201) {
        const payload = {
          avance: {
            Montant: response.data.Montant,
            dateAvance: response.data.dateAvance,
          },
          id: this.id,
        };
        this.$store.commit("avanceAdded", payload);
        this.getAllAvances(this.selectedAuto);
        this.newAvance = [];
      }

      if (!this.success.length) {
        this.success.push("Avance ajout??e avec succ??s");
        return setTimeout(() => {
          this.success = [];
          this.$emit("hideAvances");
        }, 2000);
      }
    },

    async removeAvance(avid) {
      if (avid) {
        const payload = {
          cid: this.id,
          avid,
        };
        await this.deleteAvance(payload);
        await this.getAllAvances(this.selectedAuto);
        this.success.push(" Avance supprim??e avec succ??ss");
        setTimeout(() => {
          this.success = [];
        }, 2000);
      }
    },

    formatDate(somDate) {
      return moment(somDate).format("DD-MM-YYYY");
    },
  },

  computed: {
    ...mapGetters(["singleCandidate", "selectedAuto"]),

    candidate() {
      return this.singleCandidate(this.id);
    },
  },
};
</script>

<style scoped>
.fa {
  font-size: 0.8em;
  font-weight: bold;
  color: red;
}
.avancesContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
}
.modal {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  border-radius: 5px;
  background-color: white;
}

.title {
  background-color: crimson;
  width: 100%;
  margin-top: 0;
  color: white;
  height: 20%;
  position: relative;
}
.exit {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.avanceCandidate,
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4vh 4vw;
}
.avancesTable {
  width: 60%;
}
.addAvanceForm,
form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.input {
  display: block;
  padding: 1vh 1vw;
  outline: none;
  width: 40%;
  border: 1px solid lightgrey;
}

.btn {
  border: none;
}
table {
  width: 100%;
}
table,
th,
td {
  border: 1px solid rgb(255, 255, 255);
  border-collapse: collapse;
  text-align: center;
}
th,
td {
  padding: 1vh 0;
}
th {
  background-color: rgb(91, 102, 109);
  color: white;
  border-radius: 3px;
}
.operationsContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

tr:nth-child(even) {
  background-color: lightgrey;
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
