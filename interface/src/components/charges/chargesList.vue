<template>
  <div class="chargesContainer">
    <div class="heading">
      <h2>Charges du mois</h2>
    </div>
    <div class="chargesHeader">
      <div class="dateFilters">
        <form action="" @submit.prevent="reloaded">
          <select @change="changeMonth($event)" :value="selectedMonth">
            <option v-for="month in months" :key="month.index">{{
              month
            }}</option>
          </select>
          <select @change="changeYear($event)" :value="selectedYear">
            <option selected>Année</option>
            <option v-for="annee in annees" :key="annee.index">{{
              annee
            }}</option>
          </select>

          <submit-button :btnText="'Filtrer'" :type="'submit'" />
        </form>
      </div>
      <div class="chargesSum">
        <h4>
          Total du mois:<span class="totalSpan">{{ total + " Dh" }} </span>
        </h4>
      </div>
    </div>
    <div class="chargesTable">
      <table>
        <thead>
          <th>
            Libelle
          </th>
          <th>
            Montant
          </th>
          <th>
            Date
          </th>
        </thead>
        <tbody>
          <tr v-for="charge in charges" :key="charge._id">
            <td>
              {{ charge.Libelle }}
            </td>
            <td>
              {{ charge.Montant }}
            </td>

            <td class="dateCharge">
              <span>
                {{
                  formatDate(
                    charge.dateCharge.Day,
                    charge.dateCharge.Month,
                    charge.dateCharge.Year
                  )
                }}
              </span>

              <i @click="confirmation(charge._id)" class="fas fa-trash-alt"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <add-charge class="addComponent" @reload="reloaded" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import submitButton from "../shared/submitButton.vue";
import moment from "moment";
import AddCharge from "./addCharge.vue";
export default {
  components: { submitButton, AddCharge },
  name: "chargesList",

  data() {
    return {
      selectedYear: moment().get("year"),
      selectedMonth: this.currentMonth(),

      charges: [],
      total: 0,
    };
  },

  methods: {
    ...mapActions(["getCharges", "remove"]),
    changeMonth(e) {
      this.selectedMonth = e.target.value;
    },
    changeYear(e) {
      this.selectedYear = e.target.value;
    },

    confirmation(cid) {
      if (confirm("Etes vous sur de vouloir supprimer?")) {
        this.remove(cid);
        this.reloaded();
      }
    },

    currentMonth() {
      if (moment().get("month") + 1 < 10)
        return `0${moment().get("month") + 1}`;

      return moment().get("month") + 1;
    },

    formatDate(d, m, y) {
      let dateStr = `${d}-${m}-${y}`;
      return moment().format(dateStr, "DD-MM-YYYY");
    },
    currentMonthCharges() {
      return (this.charges = this.getCurrentMonthCharges(
        this.selectedMonth,
        this.selectedYear
      ));
    },
    async reloaded() {
      await this.getCharges();
      this.currentMonthCharges();
      this.totalCharges(this.charges);
    },

    totalCharges() {
      let sum = 0;
      for (let i = 0; i <= this.charges.length - 1; i++) {
        sum += parseInt(this.charges[i].Montant);
      }
      return (this.total = sum);
    },
  },

  computed: {
    ...mapGetters(["getCurrentMonthCharges"]),

    months() {
      const arr = [];
      for (let i = 1; i <= 12; i++) {
        if (i < 10) {
          i = `0${i}`;
        }
        arr.push(i);
      }
      return arr;
    },
    annees() {
      const arr = [];
      for (let i = 2021; i <= 2030; i++) {
        arr.push(i);
      }
      return arr;
    },
  },

  created() {
    this.reloaded();
  },
};
</script>

<style scoped>
.dateCharge {
  position: relative;
}

.dateCharge i {
  position: absolute;
  top: 2px;
  right: 5px;
  font-size: 15px;
}
.addComponent {
  width: 30%;
}
.totalSpan {
  background-color: crimson;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-left: 5px;
}
.chargesHeader {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chargesContainer {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
}

.chargesTable {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
}

form select {
  padding: 3px;
  margin: 5px;
}
</style>
