<template>
  <div class="myHeader">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "myHeader",
  data() {
    return {
      autoEcole: "",
    };
  },

  methods: {
    ...mapActions(["selectNewAuto"]),
    changeAuto(e) {
      this.selectNewAuto(e.target.value);
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
  right: 10px;
  padding: 1vh 2vw;
  outline: none;
  border: none;
  font-size: 1rem;
}
</style>
