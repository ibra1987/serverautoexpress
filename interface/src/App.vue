<template>
  <div id="app">
    <div class="container">
      <my-header />

      <navBar />
      <router-view />
    </div>
  </div>
</template>

<script>
import navBar from "./components/shared/navBar.vue";
import myHeader from "./components/shared/headerBoard.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    navBar,
    myHeader,
  },

  methods: {
    ...mapActions(["getCandidates"]),
  },

  async created() {
    await this.getCandidates();
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
table {
  width: 90%;
}
table,
th,
td {
  border: none;
  border-collapse: collapse;
  text-align: center;
  padding: 1vh;
}
.addComponent {
  width: 30%;
  border-radius: 2px;
}
th {
  background-color: #292b2c;
  color: rgb(255, 255, 255);
  border-left: 1px solid white;
}
.operationsContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

tr:nth-child(even) {
  background-color: rgba(246, 249, 255, 0.932);
}
.fa-user-edit {
  color: #0275d8;
  cursor: pointer;
}
.fa-trash-alt {
  color: #d9534f;
  cursor: pointer;
}
.heading {
  width: 100%;
  padding: 3vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.heading:after {
  content: "";
  width: 100px;
  height: 10px;
  background: crimson;
  position: absolute;
  bottom: -8px;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 80%;
  margin: auto;
  padding: 0 10px;
}
</style>
