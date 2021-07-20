<template>
  <div class="homeContainer">
    <div class="card candidats">
      <p>Nouveau candidats cette semaine: +{{ candidatsDeSemaine.length }}</p>
    </div>
    <div class="card ">2</div>
    <div class="card">3</div>
    <div class="card">4</div>
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
    ...mapGetters(["candidatesSemaine"]),

    candidatsDeSemaine() {
      return this.candidatesSemaine;
    },
  },
  async created() {
    this.candidatsDeSemaine = await this.candidatesSemaine;
  },
};
</script>

<style scoped>
.homeContainer {
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-content: center;
}
.card {
  width: 20%;
  padding: 1vh 1vw;
}
.candidats {
  background-color: rgb(9, 219, 9);
}
</style>
