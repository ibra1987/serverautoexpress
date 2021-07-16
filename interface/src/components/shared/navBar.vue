<template>
  <nav>
    <ul>
      <router-link to="/tableaudebord">
        <li>
          <div>
            Tableau de bord
          </div>
        </li>
      </router-link>

      <router-link to="/candidates">
        <li>
          <div>
            Candidates
          </div>
        </li>
      </router-link>

      <router-link to="/charges">
        <li>
          <div>
            Charges
          </div>
        </li>
      </router-link>
      <router-link to="/vehicules">
        <li>
          <div>
            Véhicules
          </div>
        </li>
      </router-link>
      <router-link to="/echeances">
        <li>
          <div>
            Echeances
          </div>
        </li>
      </router-link>
      <router-link to="/personnel">
        <li>
          <div>
            Personnel
          </div>
        </li>
      </router-link>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "navBar",
};
</script>

<style scoped>
nav {
  width: 80%;
  margin: auto;
  margin-bottom: 10vh;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}
li {
  display: block;
  text-align: center;
  padding: 1vh 0;
  width: 160px;
}

a {
  display: block;
  text-decoration: none;
  color: rgb(170, 170, 170);
  transition: all 0.5s ease-in-out;
}
.router-link-active {
  color: white;
  background-color: crimson;
  border-radius: 3px;
}
</style>
