<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import AppMenuNav from "./AppMenuNav.vue";

defineProps<{
  id: string;
}>();

const emits = defineEmits<{
  (event: "onClose"): void;
}>();

const popoverRef = useTemplateRef("popover");
const isOpen = ref(false);

function onToggle(event: Event) {
  if (!(event instanceof ToggleEvent)) {
    return;
  }

  isOpen.value = event.newState === "open";
}

function onClickNavItem() {
  popoverRef.value?.hidePopover();

  emits("onClose");
}

function init() {
  if (!popoverRef.value) {
    return;
  }

  isOpen.value = popoverRef.value.matches(":popover-open");

  popoverRef.value?.addEventListener("toggle", onToggle);
}

function dispose() {
  popoverRef.value?.removeEventListener("toggle", onToggle);
}

onMounted(init);
onUnmounted(dispose);
</script>

<template>
  <div :id="id" popover ref="popover" tabindex="-1">
    <AppMenuNav :is-open="isOpen" @click-nav-item="onClickNavItem" />
  </div>
</template>

<style scoped>
[popover] {
  position: absolute;
  inset: unset;
  top: 2.2rem;
  right: 4px;
  border: 1px solid var(--font-color);
  background-color: var(--background-color);
}
</style>
