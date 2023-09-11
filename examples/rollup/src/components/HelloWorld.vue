<script lang="ts">
import Vue from 'vue';
import Notes from './Notes.vue';

export default Vue.extend({
  components: {
    Notes,
  },
  props: {
    msg: String,
  },
});
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="card">
      <Notes />
    </div>
    <p class="read-the-docs">
      <a target="_black" href="https://github.com/zjxxxxxxxxx/open-editor">
        Github
      </a>
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
