<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useColorModeStore } from "./stores/color-mode";
import { onUnmounted } from "vue";

const colorModeStore = useColorModeStore();

function dispose() {
  colorModeStore.dispose();
}

onUnmounted(dispose);
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/setting">Setting</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
