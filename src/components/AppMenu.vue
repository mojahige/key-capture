<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next";
import AppMenuNav from "./AppMenuNav.vue";
import { useId } from "vue";

const popoverId = useId();
</script>

<template>
  <button :popovertarget="popoverId">
    <EllipsisVertical width="1rem" height="1rem" aria-label="Menu" />
  </button>

  <div :id="popoverId" popover>
    <AppMenuNav />
  </div>
</template>

<style scoped>
button {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  padding: 0.2rem;
  border: 0;
  appearance: none;
}

[popover]:popover-open {
  position: absolute;
  inset: unset;
  top: 1.6rem;
  right: 2px;
  border: 1px solid var(--font-color);
  background-color: var(--background-color);
}
</style>
