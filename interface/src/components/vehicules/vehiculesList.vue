<template>
  <div class="vehiculesContainer">
    <div class="heading">
      <h2>
        Gestion des véhicules
      </h2>
    </div>
    <div class="addBtnContainer btnToLeft">
      <router-link to="/vehicules/create" class="button"
        >Nouveau vehicule
      </router-link>

      <router-view> </router-view>
    </div>
    <div class="vehicules">
      <table>
        <th>
          N Immatriculation
        </th>
        <th>
          Date visite technique
        </th>
        <th>
          Date assurance
        </th>
        <tbody>
          <tr v-for="vehicule in vehicules" :key="vehicule._id">
            <td>
              {{ vehicule.Immat }}
            </td>
            <td>
              {{ formatDate(vehicule.dateAssur) }}
            </td>
            <td class="deleteContainer">
              {{ formatDate(vehicule.dateVisite) }}
              <i
                @click="confirmation(vehicule._id)"
                class="fas fa-trash-alt"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "vehiculesList",
  components: {},

  methods: {
    ...mapActions(["getVehicules", "removeVehicule"]),
    confirmation(id) {
      if (confirm("Etes vous sur de vouloir supprimer ce vehicule")) {
        this.removeVehicule(id);
      }
    },
    formatDate(template) {
      let day = new Date(template).getDate();
      let month = new Date(template).getMonth() + 1;
      const year = new Date(template).getFullYear();

      if (day < 10) {
        day = `0${day}`;
      }

      if (month < 10) {
        month = `0${month}`;
      }

      return `${day}-${month}-${year}`;
    },
  },
  computed: {
    ...mapGetters(["allVehicules", "selectedAuto"]),

    vehicules() {
      return this.allVehicules(this.selectedAuto);
    },
  },

  created() {
    this.getVehicules();
  },
};
</script>

<style scoped>
.deleteContainer {
  position: relative;
}
.btnToLeft {
  width: 90%;
  padding-top: 3vh !important;
  justify-content: flex-start !important;
}
.deleteContainer i {
  position: absolute;
  top: 5px;
  right: 5px;
}
.vehiculesContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
}
.vehicules {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2vh;
}
</style>
