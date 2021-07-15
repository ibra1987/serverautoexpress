<template>
  <div class="homeContainer">
    <div class="card">1</div>
    <div class="card">2</div>
    <div class="card">3</div>
    <div class="card">4</div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style scoped>
.homeContainer {
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-content: center;
}
.card {
  background-color: crimson;
  width: 20%;
  padding: 1vh 1vw;
}
</style>
