import { createApp } from 'vue';
import VueSource from 'unplugin-vue-source/vue';
import './style.css';
import App from './App.vue';

createApp(App).use(VueSource).mount('#app');
