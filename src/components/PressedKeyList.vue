<script setup lang="ts">
import { watch, useTemplateRef, nextTick } from "vue";

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
    <ins v-for="(pressedKey, index) in pressedKeys" :key="index">
      {{ pressedKey }}
    </ins>
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

ins {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  min-width: 3rem;
  min-height: 3rem;
  padding: 0.5rem;
  font-size: 2rem;
  font-family: monospace;
  border: 1px solid gray;
  border-radius: 0.2rem;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow: 0 2px black;
}
</style>
