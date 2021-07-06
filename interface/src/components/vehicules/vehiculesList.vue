<template>
  <div class="vehuiculesContainers">
    <div class="heading">
      <h2>
        Gestion des véhicules
      </h2>
    </div>
    <div class="vehicules"></div>
  </div>
</template>

<script>
export default {
  name: "vehiculesList",
};
</script>

<style scoped>
.vehiculesContainer {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
}
</style>
