/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: {
    plugins: [require("unplugin-vue-source/webpack")()],
  },
});
