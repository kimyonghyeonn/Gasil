import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const routes = [
  { path: "/", component: HomePage }, // 기본 경로로 HomePage 설정
];

const router = createRouter({
  history: createWebHistory(), // URL에 # 해시 없이 깔끔한 주소
  routes,
});

export default router;
