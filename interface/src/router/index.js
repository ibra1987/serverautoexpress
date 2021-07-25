import vueRouter from "vue-router";
import candidatesList from "../components/candidates/candidatesList.vue";
import addCandidate from "../components/candidates/addCandidate.vue";
import editCandidate from "../components/candidates/editCandidate.vue";
import chargesList from "../components/charges/chargesList";
import Avances from "../components/avances/Avances.vue";
import Home from "../components/shared/Home.vue";
import vehiculesList from "../components/vehicules/vehiculesList.vue";
import echeancesList from "../components/echeances/echeancesList.vue";
import tableauDeBord from "../components/tableaudebord/tableauDeBord.vue";

const routes = [
  {
    path: "/tableaudebord",
    component: tableauDeBord,
    name: "tableauDeBord",
  },
  {
    path: "/candidates/edit/:id",
    component: editCandidate,
    name: "edit",
  },
  {
    path: "/candidates/:p?",
    component: candidatesList,
    name: "candidates",
    children: [
      {
        path: "/candidates/create",
        component: addCandidate,
        name: "create",
      },

      {
        path: "/candidates/avances/:id",
        component: Avances,
        name: "avances",
      },
    ],
  },

  {
    path: "/",
    component: Home,
  },
  {
    path: "/vehicules",
    component: vehiculesList,
  },
  {
    path: "/charges",
    name: "charges",
    component: chargesList,
  },
  {
    path: "/echeances",
    name: "echeances",
    component: echeancesList,
  },
];

const router = new vueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL,
});

export default router;
