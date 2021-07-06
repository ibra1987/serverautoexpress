<template>
  <div class="formContainer">
    <div class="heading">
      <h1>editer un candidat</h1>
    </div>

    <div class="errorsContainer">
      <div
        class="errors"
        v-show="errors.length"
        v-for="error in errors"
        :key="error.index"
      >
        <ul>
          <li>{{ error }}</li>
        </ul>
      </div>

      <div
        class="success"
        v-show="success.length"
        v-for="successmsg in success"
        :key="successmsg.index"
      >
        <ul>
          <li>{{ successmsg }}</li>
        </ul>
      </div>
    </div>
    <submit-button
      @click.native="hide"
      :btnText="'Annuler'"
      :type="'button'"
      class="annuler"
    />
    <form method="post" @submit.prevent="validate">
      <div class="inputsContainer">
        <div class="leftSide">
          <div class="selectDiv">
            <input
              @focus="focused($event)"
              @blur="focused($event)"
              type="text"
              class="input fullName"
              v-model="candidate.Fname"
              placeholder="Prénom"
            />
            <input
              @focus="focused($event)"
              @blur="focused($event)"
              type="text"
              class="input fullName"
              v-model="candidate.Lname"
              placeholder="Nom"
            />

            <input
              @focus="focused($event)"
              @blur="focused($event)"
              type="text"
              class="input"
              v-model="candidate.Cin"
              placeholder="N° de Cin"
            />
          </div>

          <div class="inputDiv">
            <input
              @focus="focused($event)"
              @blur="focused($event)"
              type="text"
              class="input"
              v-model="candidate.Adresse"
              placeholder="Adresse"
            />
          </div>
          <div class="inputDiv">
            <input
              @focus="focused($event)"
              @blur="focused($event)"
              type="text"
              class="input"
              v-model="candidate.tel"
              placeholder="N° de tel"
            />
          </div>
        </div>
        <div class="rightSide">
          <div class="selectDiv">
            <select
              name=""
              id=""
              v-model="candidate.Categorie"
              @focus="focused($event)"
              @blur="focused($event)"
            >
              <option value="" selected>Catégorie</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="EC">EC</option>
            </select>
            <select
              name=""
              id=""
              v-model="candidate.autoEcole"
              @focus="focused($event)"
              @blur="focused($event)"
            >
              <option value="" selected>Auto Ecole</option>
              <option value="akka">AKKA</option>
              <option value="aguid">ZGUID</option>
            </select>
            <select
              v-model="candidate.Extension"
              @focus="focused($event)"
              @blur="focused($event)"
            >
              <option value="" selected>Extension</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>

          <div class="inputDiv">
            <input
              @focus="focused($event)"
              @blur="focused($event)"
              class="input"
              type="Number"
              v-model="candidate.Price"
              placeholder="Prix"
            />
          </div>

          <div class="inputDiv">
            <input
              @focus="focused($event)"
              @blur="focused($event)"
              class="input"
              type="text"
              v-model="candidate.Referent"
              placeholder="Referent"
            />
          </div>
        </div>
      </div>

      <div class="btnContainer">
        <submit-button :type="'submit'" :btnText="'Enregistrer'" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import submitButton from "../shared/submitButton.vue";
export default {
  name: "editCandidate",

  components: {
    submitButton,
  },

  data() {
    return {
      success: [],
      errors: [],
    };
  },

  methods: {
    focused(e) {
      if (e.target.classList.contains("focused")) {
        return e.target.classList.remove("focused");
      }
    },
    ...mapActions(["updateCandidate"]),
    hide() {
      this.$emit("hideEdit");
    },

    validate() {
      if (
        this.candidate.Fname === "" ||
        this.candidate.Lname === "" ||
        this.candidate.Cin === "" ||
        this.candidate.Price === "" ||
        this.candidate.Categorie === "" ||
        this.candidate.autoEcole === ""
      ) {
        if (!this.errors.length) {
          this.errors.push("Merci de remplir tous les champs obligators");
        }
        return setTimeout(() => {
          this.errors = [];
        }, 4000);
      }

      if (isNaN(this.candidate.Price)) {
        return "le prix doit etre un chiffre";
      }

      this.updateCandidate(this.candidate);
      this.$emit("hideme");
      if (!this.success.length) {
        return setTimeout(() => {
          this.errors = [];
        }, 4000);
      }
    },
  },
  computed: {
    ...mapGetters(["allCandidates"]),
    candidate() {
      return this.allCandidates.filter(
        (c) => c._id === this.$route.params.id
      )[0];
    },
  },
};
</script>

<style scoped>
.focused {
  border-bottom: 2px solid skyblue !important;
}
.annuler {
  background-color: rgb(17, 16, 16);
}
.formContainer {
  width: 100%;
}
.errorsContainer {
  width: 100%;
  height: 10vh;
  margin: 3vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.errors,
.success {
  width: 80%;
  background-color: rgb(220, 20, 60, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.success {
  background-color: rgba(6, 128, 46, 0.2);
}

ul {
  list-style: none;
}

.errors ul li {
  color: crimson;
  font-weight: bold;
}
.success ul li {
  color: rgb(20, 92, 58);
  font-weight: bold;
}
form {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.inputsContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.leftSide,
.rightSide {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  width: 50%;
}

.inputDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  width: 80%;
  height: 6vh;
  padding: 0 10px;
  margin: 2vh 0;
}
.selectDiv {
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 76%;
  height: 6vh;
  margin: 2vh 0;
}
select {
  border: none;
  border-bottom: 1px solid lightgrey;
  display: block;
  width: 30%;
  height: 100%;
  outline-color: skyblue;
  background-color: rgb(243, 243, 243);
  border-radius: 5px;
}
.input {
  border: none;
  border-bottom: 1px solid lightgrey;
  outline: none;
  display: block;
  padding-left: 10px;
  width: 99%;
  height: 100%;
  background-color: rgb(243, 243, 243);
  border-radius: 5px;
}

.fullName {
  width: 45%;
}
.btnContainer {
  margin-top: 5vh;
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
