<script setup lang="ts">
import { useLink } from "vue-router";

const { isActive: isActiveAppHome, href: appHomePath } = useLink({ to: "/" });
</script>

<template>
  <nav>
    <RouterLink to="/setting">Setting</RouterLink>
    <RouterLink to="/about">About</RouterLink>

    <div :class="{
      hideReturnApp: isActiveAppHome
    }">
      <hr />
      <RouterLink :to="appHomePath">
        Return app
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
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

.hideReturnApp {
  visibility: hidden;
  height: 0px;
  overflow: hidden;
}
</style>
