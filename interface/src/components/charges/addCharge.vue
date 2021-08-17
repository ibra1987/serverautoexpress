<template>
  <div class="addFormContainer">
    <form @submit.prevent="chargeSubmitted">
      <div class="close">
        <router-link to="/charges">
          Fermer X
        </router-link>
      </div>
      <div class="formHeader">
        Ajouter une charge
      </div>
      <input
        type="text"
        name="Libelle"
        placeholder="Libelle "
        v-model="Libelle"
        :class="errors.length > 0 ? 'error' : ''"
        @keyup="errors = []"
      />
      <input
        type="number"
        name="Montant"
        placeholder="Montant "
        v-model="Montant"
        :class="errors.length > 0 ? 'error' : ''"
        @keyup="errors = []"
      />
      <select
        v-model="autoEcole"
        @focus="focused($event)"
        @blur="focused($event)"
      >
        <option>{{ autoEcole }}</option>
        <option v-for="auto in autoEcoles" :key="auto._id" :value="auto.Name">
          {{ auto.Name }}
        </option>
      </select>
      <input type="date" v-model="dateCharge" />
      <submit-button :btnText="'Ajouter'" :type="'submit'" class="btnBlock" />
    </form>
  </div>
</template>

<script>
import submitButton from "../shared/submitButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { submitButton },
  name: "addCharge",

  data() {
    return {
      Libelle: "",
      Montant: "",
      dateCharge: "",
      errors: [],
    };
  },

  methods: {
    ...mapActions(["addCharge"]),
    async chargeSubmitted() {
      if (this.Libelle == "" || this.Montant == "") {
        if (!this.errors.length) {
          return this.errors.push("Merci de renseigner tous les champs");
        }
        return;
      }
      const newCharge = {
        Libelle: this.Libelle,
        Montant: this.Montant,
        autoEcole: this.autoEcole,
        dateCharge: new Date(Date.parse(this.dateCharge)).toISOString(),
      };

      await this.addCharge(newCharge);
      this.Libelle = "";
      this.Montant = "";

      this.dateCharge = "";
      this.$emit("reload");
    },
  },
  computed: {
    ...mapGetters(["allAutoEcoles", "selectedAuto"]),
    autoEcoles() {
      return this.allAutoEcoles;
    },
    autoEcole() {
      return this.selectedAuto;
    },
  },
};
</script>

<style scoped>
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
