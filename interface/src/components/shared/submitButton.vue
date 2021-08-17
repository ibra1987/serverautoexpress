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

<style scoped></style>
