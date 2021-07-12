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
          <tr v-for="echeance in echeances" :key="echeance._id">
            <td>
              {{ echeance.Libelle }}
            </td>

            <td class="deleteContainer">
              {{ echeance.jourEcheance }}
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
export default {
  name: "echeancesList",
  components: {
    addEcheance,
  },
  methods: {
    ...mapActions(["getEcheances"]),
  },
  computed: {
    ...mapGetters(["allEcheances"]),

    echeances() {
      return this.allEcheances;
    },
  },
  created() {
    this.getEcheances();
  },
};
</script>

<style>
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
