<template>
  <div class="myHeader">
    <h1>Auto Ecole {{ autoEcole }}</h1>
    <input type="text" v-if="newAutoInput" v-model="newAuto" />
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

export default {
  name: "myHeader",
  data() {
    return {
      autoEcole: "",
      newAutoInput: false,
      newAuto: "",
    };
  },

  methods: {
    ...mapActions(["selectNewAuto"]),
    changeAuto(e) {
      this.selectNewAuto(e.target.value);
    },
    newAutoAdd() {
      if (this.newAutoInput) {
        if (this.newAuto !== "") {
          this.addNewAuto();
        }
      }
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
  position: relative;
}

select {
  position: absolute;
  bottom: 10px;
  right: 3em;
  padding: 1vh 2vw;
  outline: none;
  border: none;
  font-size: 1rem;
}
span {
  position: absolute;
  bottom: 5px;
  right: 5px;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
}
</style>
