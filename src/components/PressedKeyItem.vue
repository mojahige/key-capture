<script setup lang="ts">
defineProps<{
  pressedKey: string;
}>();
</script>

<template>
<ins>
  <code>
    {{ pressedKey }}
  </code>
</ins>
</template>

<style scoped>
ins {
  --color: --font-color;
  --background-color: --background-color;

  flex: 0 0 auto;
  display: grid;
  place-items: center;
  min-width: 3rem;
  min-height: 3rem;
  padding: 0.5rem;
  background-color: var(--background-color);
  border: 1px solid currentColor;
  border-radius: 0.2rem;
  color: currentColor;
  font-size: 2rem;
  font-family: monospace;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow: 0 2px currentColor;
}
</style>
