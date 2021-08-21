<template>
  <div class="addFormContainer">
    <form @submit.prevent="chargeSubmitted">
      <div class="close">
        <router-link to="/personnel">
          Fermer X
        </router-link>
      </div>
      <p v-if="message">
        {{ success }}
      </p>
      <div class="formHeader">
        Ajouter un mouveau employe
      </div>

      <input
        type="text"
        placeholder="Nom et Prenom "
        v-model="Name"
        :class="errors.length > 0 ? 'error' : ''"
        @keyup="errors = []"
      />
      <input
        type="number"
        placeholder="Salaire "
        v-model="salaire"
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
      <input type="date" v-model="dateEmbauche" />
      <submit-button :btnText="'Ajouter'" :type="'submit'" class="btnBlock" />
    </form>
  </div>
</template>

<script>
import submitButton from "../shared/submitButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { submitButton },
  name: "addPersonnel",

  data() {
    return {
      Name: "",
      salaire: "",
      dateEmbauche: "",
      errors: [],
      success: "Nouveau employe ajoute avec succes",
      message: false,
    };
  },

  methods: {
    ...mapActions(["addPersonnel"]),

    showMessage() {
      return (this.message = true);
    },
    async chargeSubmitted() {
      if (this.salaire == "" || this.Name == "" || this.dateEmbauche == "") {
        if (!this.errors.length) {
          return this.errors.push("Merci de renseigner tous les champs");
        }
        return;
      }
      const newPersonnel = {
        Name: this.Name,
        salaire: this.salaire,
        autoEcole: this.autoEcole,
        dateEmbauche: this.dateEmbauche,
      };

      await this.addPersonnel(newPersonnel);
      setTimeout(() => {
        this.showMessage();
        this.$router.push({ name: "personnelList" });
      }, 2000);

      this.Name = "";
      this.salaire = "";
      this.dateEmbauche = "";
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
