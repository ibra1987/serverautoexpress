<template>
  <div class="homeContainer">
    <div class="card candidats">
      <h3>
        Nouveau candidats
      </h3>
      <div class="cardItems">
        <span>cette semaine:</span>
        <span class="number">+ {{ candidatsDeSemaine.length }}</span>
      </div>
      <div class="cardItems">
        <span>ce mois:</span>
        <span class="number">+ {{ candidatsDeSemaine.length }}</span>
      </div>
    </div>
    <div class="card ">2</div>
    <div class="card">3</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "home",

  data() {
    return {
      beneficesTotal: 0,
      chargesDuMois: 0,

      candidatesMois: 0,
      totalCharges: 0,
      Encaisse: 0,
      beneficesDuMois: 0,
      Caisse: 0,
      Banque: 0,
    };
  },
  computed: {
    ...mapGetters(["candidatesSemaine", "selectedAuto"]),

    candidatsDeSemaine() {
      return this.candidatesSemaine(this.selectedAuto);
    },
  },
  // async created() {
  //   this.candidatsDeSemaine = await this.candidatesSemaine(this.selectedAuto);
  // },
};
</script>

<style scoped>
.homeContainer {
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-content: center;
}
h3 {
  display: block;
  width: 100%;
  margin-bottom: 3vh;
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
  padding: 1vh 0;
  font-size: 1.2rem;
}
.candidats {
  background-color: rgb(106, 156, 106);
  color: white;
}
.number {
  font-size: 2.5rem !important;
  color: rgb(211, 175, 17);
}
</style>
