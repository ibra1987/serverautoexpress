<template>
  <div class="echeancesContainer">
    <div class="heading">
      <h2>
        Liste echeances
      </h2>
    </div>
    <div class="echeances">
      <table>
        <th>
          Libelle
        </th>

        <th>
          Date echeance
        </th>
        <tbody>
          <tr
            v-for="echeance in echeances"
            :key="echeance._id"
            :id="echeance._id"
          >
            <td>
              {{ echeance.Libelle }}
            </td>

            <td class="deleteContainer">
              <span>{{ formatEcheanceDate(echeance.jourEcheance) }} </span>
              <i
                @click="confirmation(echeance._id)"
                class="fas fa-trash-alt"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <add-echeance class="addComponent" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addEcheance from "./addEcheance.vue";
import moment from "moment";
export default {
  name: "echeancesList",
  components: {
    addEcheance,
  },
  data() {
    return {
      closestEcheance: false,
    };
  },
  methods: {
    ...mapActions(["getEcheances", "removeEcheance"]),
    async reload() {
      await this.getEcheances();
      await this.calculEcheance();
    },

    calculEcheance() {
      if (this.echeances.length) {
        this.echeances.map((echeance) => {
          const echeanceDate = this.formatEcheanceDate(echeance.jourEcheance);
          const currentDate = new Date();
          if (
            moment(echeanceDate, "DD-MM-YYYY").year() ===
            currentDate.getFullYear()
          ) {
            if (
              parseInt(moment(echeanceDate, "DD-MM-YYYY").format("M")) ===
              parseInt(currentDate.getMonth() + 1)
            ) {
              if (
                parseInt(moment(echeanceDate, "DD-MM-YYYY").date()) -
                  parseInt(currentDate.getDate()) <=
                5
              ) {
                document.getElementById(echeance._id).style.color = "red";
              }
            }
          }
        });
      }
    },
    confirmation(id) {
      if (confirm("Voulez vous vraiment supprimer cet echeance?")) {
        this.removeEcheance(id);
      }
    },
    formatEcheanceDate(jour) {
      jour = parseInt(jour);
      let dateObject = new Date();
      let j = dateObject.getDate();
      let m = dateObject.getMonth() + 1;

      let y = dateObject.getFullYear();

      if (jour < j) {
        if (parseInt(m) === 12) {
          m = 1;
        } else {
          m = parseInt(m) + 1;
        }
      }
      if (m < 10) {
        m = `0${m}`;
      }
      if (jour < 10) {
        jour = `0${jour}`;
      }
      let currentDate = `${jour}-${m}-${y}`;
      return currentDate;
    },
  },
  computed: {
    ...mapGetters(["allEcheances", "selectedAuto"]),

    echeances() {
      return this.allEcheances(this.selectedAuto);
    },
  },
  async created() {
    await this.getEcheances();
    await this.calculEcheance();
  },
};
</script>

<style>
.closestEcheance {
  color: red !important;
}
.echeancesContainer {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
}
.echeances {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 5vh;
}
</style>
