const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      require("unplugin-vue-source/webpack")(),
      require("unplugin-vue-jsx/webpack")(),
    ],
  },
});
