<template>
  <div class="sectionContainer">
    <div class="heading">
      <h2>Charges du mois</h2>
    </div>
    <div class="chargesHeader">
      <div class="dateFilters">
        <form action="" @submit.prevent="reload">
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
        <div class="addBtnContainer">
          <router-link to="/charges/create" class="button"
            >Nouvelle Charge
          </router-link>

          <router-view> </router-view>
        </div>
        <div class="chargesSum">
          <h4>
            Total du mois:<span class="totalSpan">{{ total + " Dh" }} </span>
          </h4>
        </div>
      </div>

      <!-- <add-charge v-if="addForm" class="addComponent" @reload="reload" /> -->
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
                {{ formatDate(charge.dateCharge) }}
              </span>

              <i @click="confirmation(charge._id)" class="fas fa-trash-alt"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import submitButton from "../shared/submitButton.vue";
import moment from "moment";
// import AddCharge from "./addCharge.vue";
export default {
  components: { submitButton },
  name: "chargesList",

  data() {
    return {
      selectedYear: moment().get("year"),
      selectedMonth: this.currentMonth(),
      charges: [],
      addForm: false,
      total: 0,
    };
  },

  methods: {
    ...mapActions(["getCharges", "remove"]),

    toggleAddForm() {
      this.addForm = !this.addForm;
    },
    getMonthCharges() {
      return (this.charges = this.currentMonthCharges(
        this.selectedYear,
        this.selectedMonth,
        this.selectedAuto
      ));
    },
    changeMonth(e) {
      return (this.selectedMonth = e.target.value);
    },
    changeYear(e) {
      return (this.selectedYear = e.target.value);
    },

    confirmation(cid) {
      if (confirm("Etes vous sur de vouloir supprimer?")) {
        this.remove(cid);
        this.reload();
      }
    },

    async reload() {
      await this.getCharges();
      this.getMonthCharges();
      this.totalCharges();
    },

    currentMonth() {
      if (moment().get("month") + 1 < 10)
        return `0${moment().get("month") + 1}`;

      return moment().get("month") + 1;
    },

    formatDate(isoDate) {
      return moment(isoDate).format("DD-MM-YYYY");
    },

    // await this.totalCharges();

    totalCharges() {
      let sum = 0;
      for (let i = 0; i <= this.charges.length - 1; i++) {
        sum += parseInt(this.charges[i].Montant);
      }
      return (this.total = sum);
    },
  },

  computed: {
    ...mapGetters(["currentMonthCharges", "selectedAuto", "allCharges"]),
    // charges() {
    //   return this.currentMonthCharges(
    //     this.selectedYear,
    //     this.selectedMonth,
    //     this.selectedAuto
    //   );
    // },

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

  async created() {
    await this.getCharges();
    this.charges = await this.currentMonthCharges(
      this.selectedYear,
      this.selectedMonth,
      this.selectedAuto
    );
    this.totalCharges();
  },
};
</script>

<style scoped>
.chargesSum {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chargesSum h4 {
  display: inline-block;
  width: 100%;
  font-size: 1.1rem;
  cursor: none;
  color: rgb(92, 92, 92);
}

.dateCharge {
  position: relative;
}

.dateCharge i {
  position: absolute;
  top: 2px;
  right: 5px;
  font-size: 15px;
}

.totalSpan {
  background-color: crimson;
  color: white;
  padding: 0.2em;
  border-radius: 5px;
}
.chargesHeader {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dateFilters {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2vh 0;
}

@media screen and (max-width: 1200px) {
  .dateFilters {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .addBtnContainer {
    width: 90%;
  }
}

.chargesTable {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1200px) {
  form {
    flex-direction: column;
    width: 90%;
  }
  form select {
    display: inline-block;
    width: 60%;
  }
}
/* @media screen and (max-width: 900px) {
  form {
    flex-direction: column;
    width: 90%;
  }
  form select {
    display: inline-block;
    width: 60%;
  }
} */

form select {
  padding: 3px;
  margin: 5px;
}
</style>
