<template>
  <div class="addFormContainer">
    <form method="post" @submit.prevent="addVehicule">
      <div class="close">
        <router-link to="/vehicules">
          Fermer X
        </router-link>
      </div>
      <div class="formHeader">
        Ajouter un vehicule
      </div>
      <input
        type="text"
        name="Immat"
        placeholder="Immatriculation "
        v-model="Immat"
        :class="errors.length > 0 ? 'error' : ''"
        @keyup="errors = []"
      />
      <select v-model="auto">
        <option>{{ autoEcole }}</option>
        <option v-for="auto in autoEcoles" :key="auto._id" :value="auto.Name">
          {{ auto.Name }}
        </option>
      </select>
      <input
        name="dateAssur"
        placeholder="Date assurance"
        v-model="dateAssur"
        @click="setDateType"
        :class="errors.length > 0 ? 'error' : ''"
        @keyup="errors = []"
      />

      <input
        name="dateVisite"
        v-model="dateVisite"
        @click="setDateType"
        placeholder="Date visite technique"
        :class="errors.length > 0 ? 'error' : ''"
        @keyup="errors = []"
      />
      <submit-button :btnText="'Ajouter'" :type="'submit'" class="btnBlock" />
    </form>
  </div>
</template>

<script>
import submitButton from "../shared/submitButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { submitButton },
  name: "addVehicule",

  data() {
    return {
      Immat: "",
      dateAssur: "",
      dateVisite: "",
      auto: "",

      errors: [],
      success: [],
    };
  },
  computed: {
    ...mapGetters(["selectedAuto", "allAutoEcoles"]),
    autoEcole() {
      return this.selectedAuto;
    },

    autoEcoles() {
      return this.allAutoEcoles;
    },
  },

  methods: {
    setDateType(e) {
      e.target.setAttribute("type", "date");
    },

    addVehicule() {
      if (this.Immat == "" || this.dateAssur == "" || this.dateVisite == "") {
        if (!this.errors.length) {
          return this.errors.push("Merci de renseigner tous les champs");
        }
        return;
      }

      const newVehicule = {
        Immat: this.Immat,
        dateAssur: this.dateAssur,
        dateVisite: this.dateVisite,
        autoEcole: this.auto,
      };

      this.addNewVehicule(newVehicule);
      this.success.push("Vehicule ajoute avec succes");
      setTimeout(() => {
        this.success = [];
      }, 3000);
      this.Immat = "";
      this.dateVisite = "";
      this.dateAssur = "";
      this.auto = this.autoEcole;
    },
    ...mapActions(["addNewVehicule"]),
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
