<template>
  <button type="type" class="btn btn-submit">
    {{ btnText }}
  </button>
</template>

<script>
export default {
  name: "submitButton",
  props: ["btnText", "type"],
};
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  padding: 1vh 1vw;
  background-color: #33b5e5;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  color: white;
  border: none;
  outline: none;
  border-radius: 3px;
  margin: 20px;
}
</style>
