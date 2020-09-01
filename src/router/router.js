import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import { getCookie } from "../api/user";
import BackStage from "../components/BackStage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/login", name: "login", component: Login },
  { path: "/home", name: "home", component: Home },
  { path: "/backstage", name: "backstage", component: BackStage },
];

const router = new VueRouter({
  routes,
  mode: "hash",
});
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next();
  } else {
    getCookie().then((res) => {
      console.log(res);
      if (res.data.havecookie) {
        next();
      } else {
        next({ name: "login" });
      }
    });
  }
});
export default router;
