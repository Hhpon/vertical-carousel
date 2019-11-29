import Vue from "vue";
import VueRouter from "vue-router";
import Report from "../components/report/report";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Report
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
