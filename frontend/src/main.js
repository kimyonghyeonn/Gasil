import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"; // Element Plus 기본 스타일 적용

const app = createApp(App);
app.use(router); // 페이지 이동 기능 활성화
app.use(createPinia()); // 상태관리 기능 활성화
app.use(ElementPlus); // Element Plus UI 컴포넌트 사용
app.mount("#app"); // #app 태그에 Vue 앱 마운트
