<template>
  <div class="sectionContainer">
    <div class="heading">
      <h2>
        Gestion du Personnel
      </h2>
    </div>
    <div class="addBtnContainer btnToLeft">
      <router-link to="/personnel/create" class="button">Ajouter </router-link>

      <router-view> </router-view>
    </div>
    <div class="personnel">
      <table>
        <th>
          Nom
        </th>
        <th>
          Date embauche
        </th>
        <th>
          salaire
        </th>
        <th>
          Auto ecole
        </th>
        <tbody>
          <tr v-for="employe in personnel" :key="employe._id">
            <td>
              {{ employe.Name }}
            </td>
            <td>
              {{ employe.dateEmbauche }}
            </td>
            <td>
              {{ employe.salaire }}
            </td>
            <td>
              {{ employe.autoEcole }}
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
  name: "personnelList",
  components: {},

  methods: {
    ...mapActions(["getPersonnel", "removeEmploye"]),
    confirmation(id) {
      if (confirm("Etes vous sur de vouloir supprimer cet emplye")) {
        this.removeEmploye(id);
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
    ...mapGetters(["allPersonnel"]),

    personnel() {
      return this.allPersonnel;
    },
  },

  async created() {
    await this.getPersonnel();
  },
};
</script>

<style scoped>
.personnel {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2vh;
}
</style>
