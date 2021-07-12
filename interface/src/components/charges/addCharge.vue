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
        id=""
      />
      <input
        type="number"
        name="Montant"
        placeholder="Montant "
        v-model="Montant"
        id=""
      />
      <input type="date" name="dateCharge" v-model="dateCharge" id="" />
      <submit-button :btnText="'Ajouter'" :type="'submit'" class="btnBlock" />
    </form>
  </div>
</template>

<script>
import moment from "moment";
import submitButton from "../shared/submitButton.vue";
import { mapActions } from "vuex";
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
        dateCharge: {
          Day: moment(this.dateCharge).format("DD"),
          Month: moment(this.dateCharge).format("MM"),
          Year: moment(this.dateCharge).format("YYYY"),
        },
      };
      console.log(newCharge);

      await this.addCharge(newCharge);
      this.Libelle = "";
      this.Montant = "";
      this.dateCharge = "";
      this.$emit("reload");
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

input {
  margin: 10px;
  padding: 1vh 5px;
  width: 100%;
  border: none;
  background-color: rgb(243, 243, 243);
  outline: none;
}
</style>
