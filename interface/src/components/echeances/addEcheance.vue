<template>
  <div class="addFormContainer">
    <form method="post" @submit.prevent="addNewEcheance">
      <div class="close">
        <router-link to="/echeances">
          Fermer X
        </router-link>
      </div>
      <div class="formHeader">
        Ajouter une echeance
      </div>
      <input
        type="text"
        name="Libelle"
        placeholder="Libelle"
        v-model="Libelle"
        :class="errors.length > 0 ? 'error' : ''"
        @keyup="errors = []"
      />
      <select
        :class="errors.length > 0 ? 'error' : ''"
        id="6"
        @change="changeJour($event)"
        :value="jourEcheance"
      >
        <option value="" selected>Jour de l'echeance</option>
        <option v-for="jour in jours" :key="jour.index">{{ jour }}</option>
      </select>
      <select v-model="autoEcole">
        <option>{{ autoEcole }}</option>

        <option v-for="auto in autoEcoles" :key="auto._id" :value="auto.Name">
          {{ auto.Name }}
        </option>
        <option value="autres">Autres</option>
      </select>
      <submit-button :btnText="'Ajouter'" :type="'submit'" class="btnBlock" />
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import submitButton from "../shared/submitButton.vue";

export default {
  name: "addEcheance",
  components: {
    submitButton,
  },
  data() {
    return {
      Libelle: "",
      jourEcheance: "",
      autoEcole: "",
      success: [],
      errors: [],
    };
  },

  methods: {
    changeJour(e) {
      this.jourEcheance = e.target.value;
    },

    ...mapActions(["createEcheance"]),
    addNewEcheance() {
      if (
        (this.Libelle == "" || this.jourEcheance == "") &&
        !this.errors.length
      ) {
        return this.errors.push("Merci de remplir tous les champs");
      }

      const newEcheance = {
        Libelle: this.Libelle,
        jourEcheance: this.jourEcheance,
        autoEcole: this.autoEcole,
      };

      this.createEcheance(newEcheance);

      this.success.push("Echeance ajoutee avec succes");
      this.Libelle = "";
      this.jourEcheance = "";
      setTimeout(() => {
        this.success = [];
        this.errors = [];
      });
    },
  },
  computed: {
    ...mapGetters(["selectedAuto", "allAutoEcoles"]),

    autoEcoles() {
      return this.allAutoEcoles;
    },
    jours() {
      const arr = [];
      for (let i = 1; i <= 31; i++) {
        if (i < 10) {
          i = `0${i}`;
        }
        arr.push(i);
      }
      return arr;
    },
  },

  created() {
    this.autoEcole = this.selectedAuto;
  },
};
</script>

<style scoped>
.addEcheanceFormContainer {
  display: flex;
  flex-direction: column;
  padding: 5px;
  justify-content: center;
  align-items: center;
  background-color: #292b2c;
}
.error {
  border: 1px solid crimson;
}

form {
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.3em;
}
@media screen and (max-width: 1200) {
  form {
    width: 95%;
  }
}

input,
select {
  padding: 2vh 1vw;
  width: 80%;
  border: none;
  background-color: rgb(243, 243, 243);
  outline: none;
  margin: 2vh 1vw;
}
</style>
