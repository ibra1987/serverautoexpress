<template>
  <div class="formContainer">
    <div class="heading">
      <h2>
        Ajouter un nouveau candidate
      </h2>
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
          </div>

          <div class="inputDiv">
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
              v-model="candidate.Categorie"
              @focus="focused($event)"
              @blur="focused($event)"
            >
              <option value="Catégorie">Catégorie</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="EC">EC</option>
            </select>
            <select
              v-model="candidate.autoEcole"
              @focus="focused($event)"
              @blur="focused($event)"
            >
              <option value="Auto Ecole">Auto Ecole</option>
              <option
                v-for="auto in autoEcoles"
                :key="auto._id"
                :value="auto.Name"
              >
                {{ auto.Name }}
              </option>
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
              type="number"
              class="input"
              placeholder="Avance"
              v-model="candidate.Avances"
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
        <submit-button :type="''" :btnText="'Enregistrer'" />
      </div>
    </form>
  </div>
</template>

<script>
import submitButton from "../shared/submitButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "addCandidate",

  components: {
    submitButton,
  },

  data() {
    return {
      success: [],
      errors: [],
      autoEcoles: [],
      candidate: {
        Fname: "",
        Lname: "",
        Cin: "",
        Adresse: "",
        Categorie: "Catégorie",
        Price: "",
        Referent: "",
        Tel: "",
        Extension: false,
        autoEcole: "Auto Ecole",
      },
    };
  },

  computed: {
    ...mapGetters(["allAutoEcoles"]),
  },
  async created() {
    this.autoEcoles = await this.allAutoEcoles;
  },

  methods: {
    focused(e) {
      if (e.target.classList.contains("focused")) {
        return e.target.classList.remove("focused");
      }

      e.target.classList.add("focused");
    },
    ...mapActions(["addCandidate"]),
    hide() {
      this.$emit("hideme");
    },

    validate() {
      if (
        this.candidate.Fname == "" ||
        this.candidate.Lname == "" ||
        this.candidate.Cin == "" ||
        this.candidate.Price == "" ||
        this.candidate.Categorie == "" ||
        this.candidate.autoEcole == ""
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

      this.addCandidate(this.candidate);
      this.$emit("hideme");
      this.candidate = {};
      if (!this.success.length) {
        this.success.push("enregistré avec succès");
      }
      return setTimeout(() => {
        this.success = [];
      }, 4000);
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
  background-color: rgba(197, 119, 135, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vh 2vw;
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
  width: 80%;
  height: 6vh;
  padding: 0 10px;
  margin: 2vh 0;
}
.selectDiv {
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
  background-color: inherit;
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
