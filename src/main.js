import App from "./App.vue";
import { createApp } from "vue";
import { router } from "./routes";
import { createPinia } from "pinia";

import 'bootstrap';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.use(router);

app.mount("#app");
