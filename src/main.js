import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/index.js";
import '@/styles/app.scss'

const app = createApp(App)
    .use(router)

app.mount('#app')
