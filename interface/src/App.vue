<template>
  <div id="app">
    <home v-if="!isAuthenticated" />
    <div class="container" v-if="isAuthenticated">
      <my-header />

      <navBar />
      <router-view> </router-view>
      <footer>tous droits reserves @{{ auto }}</footer>
    </div>
  </div>
</template>

<script>
import navBar from "./components/shared/navBar.vue";
import Home from "./components/shared/Home.vue";
import myHeader from "./components/shared/headerBoard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    navBar,
    myHeader,
    Home,
  },

  computed: {
    ...mapGetters(["selectedAuto", "isAuthenticated"]),
    auto() {
      return this.selectedAuto;
    },
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
footer {
  margin-top: 20vh;

  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3vh;
  background-color: rgb(68, 66, 66);
  color: white;
}
a {
  text-decoration: none;
}
.sectionContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
}
.addBtnContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.addFormContainer {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
.btnBlock {
  padding: 2vh;
  width: 80%;

  color: #ffffff;
}
.error {
  border: 1px solid crimson !important;
}
.formHeader {
  color: #ffffff;
  background-color: #5a71f0;
  width: 80%;
  padding: 2vh 0;
  margin: 2vh 0;
}
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: rgb(235, 231, 231);
  scroll-behavior: smooth;
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

th {
  background-color: #5a71f0;
  color: rgb(255, 255, 255);
  border-left: 1px solid white;
}
.operationsContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btnToLeft {
  width: 90%;
  padding-top: 3vh !important;
  justify-content: flex-start !important;
}
button,
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  padding: 1vh 1vw;
  background-color: #33b5e5;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  font-size: 0.9rem;
  color: white;
  border: none;
  outline: none;
  border-radius: 3px;
  margin: 20px;
}
@media screen and (max-width: 1200px) {
  .button,
  button {
    width: 60%;
  }
  table {
    width: 95%;
  }
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
  height: 100%;
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

@media screen and (max-width: 1200) {
  .container {
    width: 95%;
  }
}
.close {
  position: absolute;
  top: 12vh;
  right: 37vw;
  color: black;
  z-index: 200;
}
</style>
