<script setup lang="ts">
import { useLink } from "vue-router";
import AppMenuNavFocusScope from "./AppMenuNavFocusScope.vue";
import AppMenuNavItem from "./AppMenuNavItem.vue";

defineProps<{
  isOpen: boolean;
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
<AppMenuNavFocusScope :activate="isOpen">
  <nav @click="onClick" role="menu">
    <AppMenuNavItem to="/setting">Setting</AppMenuNavItem>
    <AppMenuNavItem to="/about">About</AppMenuNavItem>

    <template v-if="!isActiveAppHome">
      <hr />
      <AppMenuNavItem :to="appHomePath">
        Return app
      </AppMenuNavItem>
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
