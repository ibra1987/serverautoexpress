<template>
  <div class="addEcheanceFormContainer">
    <div class="formHeader">
      Ajouter une echeance
    </div>
    <form method="post" @submit.prevent="addNewEcheance">
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
      <submit-button :btnText="'Ajouter'" :type="'submit'" class="btnBlock" />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
.btnBlock {
  width: 100%;
  background-color: #ffbb33;
  color: #292b2c;
}
.addChargeFormContainer {
  display: flex;
  flex-direction: column;
  padding: 5px;
  justify-content: center;
  align-items: center;
  background-color: #292b2c;
}
form {
  margin-top: 4vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

input,
select {
  margin: 10px;
  padding: 1vh 5px;
  width: 100%;
  border: none;
  background-color: rgb(243, 243, 243);
  outline: none;
}
.formHeader {
  color: #292b2c;
  width: 100%;
  padding: 2vh 0;
  background-color: #ffbb33;
}
</style>
