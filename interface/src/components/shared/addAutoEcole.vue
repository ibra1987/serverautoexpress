<template>
  <div class="modalContainer">
    <div class="modal">
      <form @submit.prevent="addNewAuto">
        <div class="inputContainer">
          <input
            type="text"
            v-model="autoEcole"
            placeholder="Ajouter une nouvelle auto ecole"
          />

          <h4 @click="hide">X</h4>
        </div>

        <submit-button :btnText="'Ajouter'" :type="'button'" />
      </form>
    </div>
  </div>
</template>

<script>
import submitButton from "./submitButton.vue";
import { mapActions } from "vuex";
export default {
  name: "addAutoEcole",
  components: {
    submitButton,
  },

  data() {
    return {
      autoEcole: "",
    };
  },

  methods: {
    ...mapActions(["addNewAutoEcole"]),
    hide() {
      this.$emit("hideModal");
    },

    async addNewAuto() {
      if (this.autoEcole == "") {
        return;
      }

      let formatedName = this.autoEcole.toLowerCase();

      formatedName =
        formatedName.charAt(0).toUpperCase() + formatedName.slice(1);

      const newAuto = {
        Name: formatedName,
      };

      await this.addNewAutoEcole(newAuto);
      this.autoEcole = "";
      this.hide();
    },
  },
};
</script>

<style>
.modalContainer {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  position: absolute;
  background-color: rgba(14, 10, 54, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

h4 {
  color: white;
  cursor: pointer;
}

.modal,
.inputContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
}
.inputContainer {
  flex-direction: row;
}

.inputContainer > input {
  display: block;
  width: 50%;
  padding: 1em;
  outline: none;
  border: 1px solid lightgray;
  margin: 1em;
  font-size: 1rem;
}
</style>
