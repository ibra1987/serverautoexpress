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
        <table>
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
              <td>
                {{ Avance.Montant }}
              </td>
              <td>
                {{ Avance.dateAvance | moment("DD-MM-YYYY") }}
              </td>
              <td>
                <span class="x" @click="removeAvance(Avance._id)">X</span>
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
    ...mapActions(["addNewAvance", "deleteAvance"]),

    hover(id) {
      console.log(id);
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

      console.log(response.data);

      if (response.status === 201) {
        const payload = {
          avance: {
            Montant: response.data.Montant,
            dateAvance: response.data.dateAvance,
          },
          id: this.id,
        };
        this.$store.commit("avanceAdded", payload);
      }

      if (!this.success.length) {
        this.success.push("Avance ajoutée avec succès");
        return setTimeout(() => {
          this.success = [];
        }, 4000);
      }
    },

    removeAvance(avid) {
      if (avid) {
        const payload = {
          cid: this.id,
          avid,
        };
        if (this.deleteAvance(payload))
          return setTimeout(() => {
            this.success.push("Supprimé avec succèss");
          }, 4000);
      }
    },
  },

  computed: {
    ...mapGetters(["singleCandidate"]),

    candidate() {
      return this.singleCandidate(this.id);
    },
  },
};
</script>

<style scoped>
.x {
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
