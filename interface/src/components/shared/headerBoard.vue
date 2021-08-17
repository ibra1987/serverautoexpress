<template>
  <div class="myHeader">
    <add-auto-ecole v-if="showAutoForm" @hideModal="hideModal" />
    <h1>Auto Ecole {{ selected }}</h1>

    <select @change="changeAuto($event)" :selected="selected">
      <option
        v-for="autoEcole in autoEcoles"
        :key="autoEcole._id"
        :value="autoEcole.Name"
        >{{ autoEcole.Name }}</option
      >
    </select>
    <span @click="newAutoAdd">+</span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addAutoEcole from "./addAutoEcole.vue";

export default {
  name: "myHeader",
  components: {
    addAutoEcole,
  },
  data() {
    return {
      showAutoForm: false,
      newAuto: "",
      selected: "",
    };
  },

  methods: {
    ...mapActions(["selectNewAuto", "getAutoEcoles", "getAllAvances"]),
    changeAuto(e) {
      this.selectNewAuto(e.target.value);
      this.selected = e.target.value;
      this.getAllAvances(this.selected);
    },
    hideModal() {
      this.showAutoForm = false;
    },
    newAutoAdd() {
      this.showAutoForm = !this.showAutoForm;
    },
  },
  computed: {
    ...mapGetters(["selectedAuto", "allAutoEcoles"]),

    autoEcoles() {
      return this.allAutoEcoles;
    },
  },
  async created() {
    await this.getAutoEcoles();
    this.selected = this.selectedAuto;
  },
};
</script>

<style scoped>
.myHeader {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  padding: 8vh 0;
  color: white;
  background-color: #5a71f0;
  margin-bottom: 20px;
  /* position: relative; */
}

select {
  position: absolute;
  top: 10px;
  right: 15vw;
  padding: 1vh 2vw;
  outline: none;
  border: none;
  font-size: 1rem;
}

span {
  position: absolute;
  top: 5px;
  right: 12vw;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
}
</style>
