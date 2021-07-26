<template>
  <div class="addChargeFormContainer">
    <div class="formHeader">
      Ajouter une charge
    </div>
    <form method="post" @submit.prevent="chargeSubmitted">
      <input
        type="text"
        name="Libelle"
        placeholder="Libelle "
        v-model="Libelle"
      />
      <input
        type="number"
        name="Montant"
        placeholder="Montant "
        v-model="Montant"
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
      <input type="date" name="dateCharge" v-model="dateCharge" />
      <submit-button :btnText="'Ajouter'" :type="'submit'" class="btnBlock" />
    </form>
  </div>
</template>

<script>
import moment from "moment";
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
    };
  },

  methods: {
    ...mapActions(["addCharge"]),
    async chargeSubmitted() {
      const newCharge = {
        Libelle: this.Libelle,
        Montant: this.Montant,
        autoEcole: this.autoEcole,
        dateCharge: {
          Day: moment(this.dateCharge).format("DD"),
          Month: moment(this.dateCharge).format("MM"),
          Year: moment(this.dateCharge).format("YYYY"),
        },
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
.formHeader {
  color: #292b2c;
  width: 100%;
  padding: 2vh 0;
  background-color: #ffbb33;
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
  width: 100%;
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
</style>
