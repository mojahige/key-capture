<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useKeypressListener } from "../composables/use-keypress-listener";
import type { PressedEvent } from "../composables/use-keypress-listener";
import PressedKeyList from "@/components/PressedKeyList.vue";

const CLEAR_TIME = 1500;
const toEmptyReplaceList = ["numpad", "key"];
const regex = new RegExp(toEmptyReplaceList.join("|"), "gi");

const pressedKeys = ref<string[]>([]);
const timerId = ref(0);

const { listen, unlisten } = useKeypressListener();

function clear() {
  timerId.value = setTimeout(() => {
    pressedKeys.value = [];
  }, CLEAR_TIME);
}

function onKeyPressed(event: PressedEvent) {
  clearTimeout(timerId.value);
  pressedKeys.value.push(event.payload.replace(regex, ""));
  clear();
}

async function init() {
  void listen(onKeyPressed);
}

function dispose() {
  unlisten.value?.();
}

onMounted(init);
onBeforeUnmount(dispose);
</script>

<template>
  <PressedKeyList :pressed-keys="pressedKeys" />
</template>
