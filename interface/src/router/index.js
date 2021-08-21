import vueRouter from "vue-router";
import candidatesList from "../components/candidates/candidatesList.vue";
import addCandidate from "../components/candidates/addCandidate.vue";
import editCandidate from "../components/candidates/editCandidate.vue";
import chargesList from "../components/charges/chargesList";
import addCharge from "../components/charges/addCharge.vue";
import Avances from "../components/avances/Avances.vue";
import Home from "../components/shared/Home.vue";
import vehiculesList from "../components/vehicules/vehiculesList.vue";
import addVehicule from "../components/vehicules/addVehicule.vue";
import echeancesList from "../components/echeances/echeancesList.vue";
import addEcheance from "../components/echeances/addEcheance.vue";
import tableauDeBord from "../components/tableaudebord/tableauDeBord.vue";
import personnelList from "../components/personnel/personnelList.vue";
import addPersonnel from "../components/personnel/addPersonnel.vue";

const routes = [
  {
    path: "/tableaudebord",
    component: tableauDeBord,
    name: "tableauDeBord",
  },
  {
    path: "/personnel",
    component: personnelList,
    name: "personnelList",
    children: [
      {
        path: "/personnel/create",
        component: addPersonnel,
        name: "addPersonnel",
      },
    ],
  },
  {
    path: "/candidates/edit/:id",
    component: editCandidate,
    name: "edit",
  },
  {
    path: "/candidates",
    component: candidatesList,
    name: "candidates",
    children: [
      {
        path: "/candidates/create",
        component: addCandidate,
        name: "createCandidate",
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
    children: [
      {
        path: "/vehicules/create",
        component: addVehicule,
        name: "createVehicule",
      },
    ],
  },
  {
    path: "/charges",
    name: "charges",
    component: chargesList,
    children: [
      {
        path: "/charges/create",
        component: addCharge,
      },
    ],
  },
  {
    path: "/echeances",
    name: "echeances",
    component: echeancesList,
    children: [
      {
        path: "/echeances/create",
        component: addEcheance,
        name: "createEcheance",
      },
    ],
  },
];

const router = new vueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL,
});

export default router;
