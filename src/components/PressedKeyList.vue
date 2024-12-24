<script setup lang="ts">
import { watch, useTemplateRef, nextTick } from "vue";
import PressedKeyListItem from "./PressedKeyListItem.vue";

const props = defineProps<{
  pressedKeys: string[];
}>();

const sliderRef = useTemplateRef("slider");

function showLatestKey() {
  if (sliderRef.value?.lastElementChild instanceof HTMLElement) {
    sliderRef.value.lastElementChild.scrollIntoView({
      inline: "end",
    });
  }
}

watch(() => props.pressedKeys.length, async () => {
  await nextTick();
  showLatestKey();
});
</script>

<template>
  <div ref="slider">
    <template v-for="(pressedKey, index) in pressedKeys" :key="index">
      <PressedKeyListItem :pressed-key="pressedKey" />
    </template>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.2rem;
  padding: 0.2rem 1rem;
  justify-content: center;
  overflow: hidden;
}
</style>
