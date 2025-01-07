<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next";
import { useId, useTemplateRef } from "vue";
import AppMenuPopover from "./AppMenuPopover.vue";

const popoverId = useId();
const popoverTriggerRef = useTemplateRef("popover-trigger");

function onClose() {
  if (!popoverTriggerRef.value?.matches(":focus")) {
    popoverTriggerRef.value?.focus();
  }
}
</script>

<template>
  <div class="appMenu">
    <button :popovertarget="popoverId" ref="popover-trigger">
      <EllipsisVertical width="1.5rem" height="1.5rem" aria-label="Menu" />
    </button>

    <AppMenuPopover :id="popoverId" @on-close="onClose" />
  </div>
</template>

<style scoped>
.appMenu {
  position: fixed;
  top: 0;
  right: 0;
}

button {
  display: inline-flex;
  padding: 0.2rem;
  border: 0;
  appearance: none;
  background: none;
}
</style>
