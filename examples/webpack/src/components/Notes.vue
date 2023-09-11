<script setup lang="ts">
import Tree from './tree/index.vue';
</script>

<template>
  <p>
    press hotkey ⌨️ <kbd>option ⌥</kbd> + <kbd>command ⌘</kbd> + <kbd>O</kbd>,
    then click the HTML element you wish to inspect.
  </p>
  <p>press hotkey ⌨️ <kbd>command ⌘</kbd> + 🖱 click, show component tree.</p>
  <Tree />
  <p>press hotkey ⌨️ <kbd>esc</kbd> or 🖱 right-click to exit inspect.</p>
</template>
