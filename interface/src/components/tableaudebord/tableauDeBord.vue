<template>
  <div class="homeContainer">
    <div class="card candidats">
      <h3>
        Nouveau candidats
      </h3>
      <div class="cardItems">
        <span>cette semaine:</span>
        <span class="number">+ {{ candidatsDeSemaine }}</span>
      </div>
      <div class="cardItems">
        <span>ce mois:</span>
        <span class="number">+ {{ candidatsDuMois }}</span>
      </div>
    </div>
    <div class="card charges">
      <h3>
        Charges du Mois
      </h3>
      <div class="cardItems">
        <span>cette semaine:</span>
        <span class="number"> {{ chargesDuMois }}</span>
      </div>
      <div class="cardItems">
        <span>ce mois:</span>
        <span class="number">+ {{ candidatsDuMois }}</span>
      </div>
    </div>
    <div class="card">{{ totalPrice }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "home",

  data() {
    return {
      beneficesTotal: 0,

      totalCharges: 0,

      Encaisse: 0,
      beneficesDuMois: 0,
      Caisse: 0,
      Banque: 0,
    };
  },
  methods: {
    ...mapActions(["getCharges"]),
  },
  computed: {
    ...mapGetters([
      "candidatesSemaine",
      "selectedAuto",
      "candidatesMonth",
      "chargesMonth",
      "candidatesTotalPrice",
    ]),

    chargesDuMois() {
      return this.chargesMonth(this.selectedAuto);
    },
    candidatsDeSemaine() {
      return this.candidatesSemaine(this.selectedAuto);
    },
    candidatsDuMois() {
      return this.candidatesMonth(this.selectedAuto);
    },
    totalPrice() {
      return this.candidatesTotalPrice(this.selectedAuto);
    },
  },

  async created() {
    await this.getCharges();
    console.log(this.candidatesTotalPrice(this.selectedAuto));
  },
};
</script>

<style scoped>
.homeContainer {
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-content: center;
}
h3 {
  display: block;
  width: 100%;
  margin-bottom: 2vh;
  padding: 1em;
  letter-spacing: 1px;
}

.card {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 3px;
}
.cardItems {
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cardItems span {
  width: 50%;
  text-align: center;
  padding: 0.5vh 0;
  font-size: 1.2rem;
}
.candidats {
  background-image: linear-gradient(
    to left,
    rgb(164, 234, 243),
    rgb(225, 234, 236)
  );

  color: rgb(0, 145, 230);
}
.charges {
  background-image: linear-gradient(
    to left,
    rgb(226, 164, 164),
    rgb(243, 238, 233)
  );

  color: rgb(240, 40, 13);
}

.charges .number {
  color: rgb(240, 40, 13) !important;
}
.number {
  font-size: 2.5rem !important;
  color: rgb(4, 177, 24);
}
</style>
