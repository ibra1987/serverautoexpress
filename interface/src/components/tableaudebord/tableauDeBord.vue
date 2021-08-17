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
      <div class="cardItems">
        <span>cet annee</span>
        <span class="number">+ {{ candidatsDelAnnee }}</span>
      </div>
    </div>
    <div class="card charges">
      <h3>
        Charges du Mois
      </h3>
      <div class="cardItems">
        <span>cette semaine:</span>
        <span class="number"> {{ chargesSemaine }} </span>
      </div>
      <div class="cardItems">
        <span>ce mois:</span>
        <span class="number"> {{ totalMonthCharges }}</span>
      </div>
      <div class="cardItems">
        <span>cet annee</span>
        <span class="number"> {{ totalYearCharges }}</span>
      </div>
    </div>
    <div class="card encaisse">
      <h3>
        Total encaisse
      </h3>
      <div class="cardItems">
        <span>cette semaine:</span>
        <span class="number"> {{ totalEncaisseWeek }}</span>
      </div>
      <div class="cardItems">
        <span>ce mois:</span>
        <span class="number">{{ totalEncaisseMonth }}</span>
      </div>
      <div class="cardItems">
        <span>cet annee</span>
        <span class="number">{{ totalEncaisseYear }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
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
    sum_array(arr) {
      // store our final answer
      var sum = 0;

      // loop through entire array
      for (var i = 0; i < arr.length; i++) {
        // loop through each inner array
        for (var j = 0; j < arr[i].length; j++) {
          // add this number to the current final sum
          if (isNaN(arr[i][j])) arr[i][j] = 0;
          sum += arr[i][j];
        }
      }

      return sum;
    },
  },
  computed: {
    ...mapGetters([
      "candidatesSemaine",
      "candidatesYear",
      "selectedAuto",
      "candidatesMonth",
      "encaisseThisYear",
      "encaisseThisMonth",
      "encaisseThisWeek",
      "weekCharges",
      "currentMonthCharges",
      "yearCharges",
      "allAvances",
    ]),
    totalMonthCharges() {
      return this.monthCharges.reduce(
        (tot, next) => parseInt(tot) + parseInt(next.Montant),
        0
      );
    },

    candidatsDeSemaine() {
      return this.candidatesSemaine(this.selectedAuto);
    },
    candidatsDuMois() {
      return this.candidatesMonth(this.selectedAuto);
    },
    candidatsDelAnnee() {
      return this.candidatesYear(this.selectedAuto);
    },
    // totalPrice() {
    //   return this.candidatesTotalPrice(this.selectedAuto);
    // },

    totalEncaisseMonth() {
      return this.encaisseThisMonth;
    },

    totalEncaisseWeek() {
      return this.encaisseThisWeek;
    },

    totalEncaisseYear() {
      return this.encaisseThisYear;
    },

    chargesSemaine() {
      return this.weekCharges(this.selectedAuto).reduce(
        (tot, next) => parseInt(tot) + parseInt(next.Montant),
        0
      );
    },

    monthCharges() {
      return this.currentMonthCharges(
        moment().get("year"),
        moment().format("MM"),

        this.selectedAuto
      );
    },
    totalYearCharges() {
      return this.yearCharges(this.selectedAuto).reduce(
        (tot, next) => parseInt(tot) + parseInt(next.Montant),
        0
      );
    },
  },

  async created() {
    await this.getCharges();
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

@media screen and (max-width: 1200px) {
  .homeContainer {
    flex-direction: column;
  }
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

@media screen and (max-width: 1200px) {
  .card {
    width: 90%;
    margin: 15px;
    padding: 1vh 1vw;
  }
}

.cardItems {
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cardItems span {
  text-align: left;
  padding-left: 40px;
  width: 50%;
  font-size: 1.2rem;
}
.candidats {
  background-image: linear-gradient(
    to left,
    rgb(164, 234, 243),
    rgb(225, 234, 236)
  );
  box-shadow: rgb(164, 234, 243) 0px 5px 15px;

  color: rgb(3, 158, 248);
}
.charges {
  background-image: linear-gradient(
    to left,
    rgb(226, 164, 164),
    rgb(243, 238, 233)
  );
  box-shadow: rgb(226, 164, 164) 0px 5px 15px;
  color: rgb(240, 40, 13);
}
.encaisse {
  background-image: linear-gradient(
    to left,
    rgb(141, 231, 130),
    rgb(220, 231, 221)
  );
  box-shadow: rgb(141, 231, 130) 0px 5px 15px;

  color: rgb(5, 114, 20);
}

.charges .number {
  color: rgb(240, 40, 13) !important;
}
.number {
  font-size: 2.5rem !important;
  text-align: right !important;
  padding-right: 40px !important;
}
</style>
