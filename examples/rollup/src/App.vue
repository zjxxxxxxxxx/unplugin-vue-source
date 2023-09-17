<script lang="tsx">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld";

export default Vue.extend({
  components: {
    HelloWorld,
  },

});
</script>

<template>
  <div>
    <div>
      <a href="https://rollupjs.org" target="_blank">
        <img src="../public/rollup.svg" class="logo" alt="Rollup logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="../public/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="Roolup + Vue" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
