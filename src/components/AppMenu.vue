<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next";
import AppMenuNav from "./AppMenuNav.vue";
import { onMounted, onUnmounted, ref, useId, useTemplateRef } from "vue";

const popoverId = useId();
const popoverTriggerRef = useTemplateRef("popover-trigger");
const popoverRef = useTemplateRef("popover");
const isOpen = ref(false);

function onTogglePopover(event: Event) {
  if (!(event instanceof ToggleEvent)) {
    return;
  }

  isOpen.value = event.newState === "open";
}

function onClickNavItem() {
  popoverRef.value?.hidePopover();

  if (!popoverTriggerRef.value?.matches(":focus")) {
    popoverTriggerRef.value?.focus();
  }
}

function init() {
  isOpen.value = !!popoverRef.value?.matches(":popover-open");

  popoverRef.value?.addEventListener("toggle", onTogglePopover);
}

function dispose() {
  popoverRef.value?.removeEventListener("toggle", onTogglePopover);
}

onMounted(init);
onUnmounted(dispose);
</script>

<template>
  <button :popovertarget="popoverId" ref="popover-trigger">
    <EllipsisVertical width="1rem" height="1rem" aria-label="Menu" />
  </button>

  <div :id="popoverId" popover ref="popover">
    <AppMenuNav :is-active="isOpen" @click-nav-item="onClickNavItem" />
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
