<script lang="ts">
import Vue from 'vue';
import SubTree1 from './SubTree1.vue';

export default Vue.extend({
  name: 'Tree',
  components: {
    SubTree1,
  },
});
</script>

<template>
  <SubTree1 />
</template>
