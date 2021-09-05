<template>
  <div class="homeContainer">
    <form @submit.prevent="handleLogin" class="loginForm">
      <h3>Veuillez vous connecter</h3>
      <span v-if="errors.length">sdgffsgsgdf</span>
      <input type="text" placeholder="email" v-model="name" />
      <input type="password" placeholder="mot de pass" v-model="password" />
      <input type="submit" value="Se connecter" />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Home",

  data() {
    return {
      name: "",
      password: "",
      errors: [],
    };
  },

  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      const creds = {
        Name: this.name,
        Password: this.password,
      };
      const res = await axios.post(
        `api/users/login`,
        creds,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 400) {
        return this.errors.push("Merci de verifier vos informations");
      }

      if (res.status === 200) {
        this.login();
        this.$router.push("/tableaudebord");
      }
    },
  },
};
</script>

<style scoped>
.homeContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to left,
    rgb(135, 151, 224),
    rgb(62, 161, 185)
  );
  height: 100vh;
  width: 100vw;
}

form {
  height: 50vh;
  background-color: white;
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

form input {
  display: inline-block;
  width: 70%;
  margin: 1em;
  padding: 2vh 1vw;
  border: 1px solid rgb(60, 60, 66);
  outline: none;
  font-size: 1.1rem;
  border-radius: 5px;
}

form input[type="submit"] {
  border: none;
  background-image: linear-gradient(
    to left,
    rgb(135, 151, 224),
    rgb(62, 161, 185)
  );
  cursor: pointer;
  color: white;
  font-size: 1, 2rem;
  letter-spacing: 2px;
}
</style>
