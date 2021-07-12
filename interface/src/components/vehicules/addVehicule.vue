<template>
  <div class="addChargeFormContainer">
    <div class="formHeader">
      Ajouter un vehicule
    </div>
    <form method="post" @submit.prevent="addVehicule">
      <input
        type="text"
        name="Immat"
        placeholder="Immatriculation "
        v-model="Immat"
        :class="errors.length > 0 ? 'error' : ''"
        @keyup="errors = []"
      />
      <input
        name="dateAssur"
        placeholder="Date assurance"
        v-model="dateAssur"
        @click="setDateType"
        :class="errors.length > 0 ? 'error' : ''"
        @keyup="errors = []"
      />
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
import { mapActions } from "vuex";
export default {
  components: { submitButton },
  name: "addVehicule",

  data() {
    return {
      Immat: "",
      dateAssur: "",
      dateVisite: "",
      errors: [],
      success: [],
    };
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
      };

      this.addNewVehicule(newVehicule);
      this.success.push("Vehicule ajoute avec succes");
      setTimeout(() => {
        this.success = [];
      }, 3000);
      this.Immat = "";
      this.dateVisite = "";
      this.dateAssur = "";
    },
    ...mapActions(["addNewVehicule"]),
  },
};
</script>

<style scoped>
.formHeader {
  color: #292b2c;
  width: 100%;
  padding: 2vh 0;
  background-color: #ffbb33;
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

input {
  margin: 10px;
  padding: 1vh 5px;
  width: 100%;
  border: none;
  background-color: rgb(243, 243, 243);
  outline: none;
}
</style>
