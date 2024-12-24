<script setup lang="ts">
import { RouterView } from "vue-router";
import { useColorModeStore } from "./stores/color-mode";
import { onUnmounted } from "vue";
import AppMenu from "./components/AppMenu.vue";

const colorModeStore = useColorModeStore();

function dispose() {
  colorModeStore.dispose();
}

onUnmounted(dispose);
</script>

<template>
  <header>
    <AppMenu />
  </header>

  <main>
    <RouterView />
  </main>
</template>
