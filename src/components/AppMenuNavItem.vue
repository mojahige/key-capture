<script setup lang="ts">
import type { RouterLinkProps } from "vue-router";

defineProps<RouterLinkProps>();
</script>

<template>
  <RouterLink v-bind="$props" custom v-slot="{ href, navigate }">
    <a
      :href="href"
      @click="navigate"
      role="menuitem"
    >
      <slot />
    </a>
  </RouterLink>
</template>
