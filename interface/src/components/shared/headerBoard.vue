<template>
  <div class="myHeader">
    <add-auto-ecole v-if="showAutoForm" @hideModal="hideModal" />
    <h1>Auto Ecole {{ autoEcole }}</h1>

    <select
      id="3"
      name="autoEcole"
      v-model="autoEcole"
      @change="changeAuto($event)"
    >
      <option value="Akka">Akka</option>
      <option value="Zguid">Zguid</option>
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
      autoEcole: "",
      showAutoForm: false,
      newAuto: "",
    };
  },

  methods: {
    ...mapActions(["selectNewAuto"]),
    changeAuto(e) {
      this.selectNewAuto(e.target.value);
    },
    hideModal() {
      this.showAutoForm = false;
    },
    newAutoAdd() {
      this.showAutoForm = !this.showAutoForm;
    },
  },
  computed: {
    ...mapGetters(["selectedAuto"]),
  },
  created() {
    this.autoEcole = this.selectedAuto;
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
  background-color: #292b2c;
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
