import { createWebHistory, createRouter } from "vue-router";
import Home from "@/pages/Home.vue";
import Login from "@/pages/LoginPage.vue";

import HomeGuard from './guards/homeGuard';
import LoginGuard from './guards/loginGuard';

const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
    beforeEnter: HomeGuard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: LoginGuard
  },
];




const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
