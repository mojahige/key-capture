<script setup lang="ts">
import { useLink } from "vue-router";
import AppMenuNavFocusScope from "./AppMenuNavFocusScope.vue";

defineProps<{
  isActive: boolean;
}>();

const emits = defineEmits<{
  (event: "clickNavItem"): void;
}>();

const { isActive: isActiveAppHome, href: appHomePath } = useLink({ to: "/" });

function onClick(event: MouseEvent) {
  if (!(event.target instanceof HTMLAnchorElement)) {
    return;
  }

  emits("clickNavItem");
}
</script>

<template>
<AppMenuNavFocusScope :activate="isActive">
  <nav @click="onClick">
    <RouterLink to="/setting">Setting</RouterLink>
    <RouterLink to="/about">About</RouterLink>

    <template v-if="!isActiveAppHome">
      <hr />
      <RouterLink :to="appHomePath">
        Return app
      </RouterLink>
    </template>
  </nav>
</AppMenuNavFocusScope>
</template>

<style scoped>
nav {
  min-width: 6rem;
}

a {
  display: block;
  padding: 0.2rem;
  color: var(--font-color);
  text-decoration: none;
}

hr {
  height: 1px;
  border: 0;
  background-color: var(--font-color);
}
</style>
