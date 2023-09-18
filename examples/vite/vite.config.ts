import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueJsx from 'unplugin-vue-jsx/vite';
import VueSource from 'unplugin-vue-source/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueSource({}), VueJsx({}), vue()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import { h, Fragment } from 'vue';",
  },
});
