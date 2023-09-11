import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueSource from "unplugin-vue-source/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueSource({})],
});
