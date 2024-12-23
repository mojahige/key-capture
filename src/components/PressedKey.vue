<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { useKeypressListener } from "../composables/use-keypress-listener";
import type { PressedEvent } from "../composables/use-keypress-listener";
import PressedKeyList from "@/components/PressedKeyList.vue";
import type { UnlistenFn } from "@tauri-apps/api/event";

const CLEAR_TIME = 1500;
const toEmptyReplaceList = ["numpad", "key"];
const regex = new RegExp(toEmptyReplaceList.join("|"), "gi");

const pressedKeys = ref<string[]>([]);
const timerId = ref(0);
let unlisten: UnlistenFn | undefined = undefined;

const { listen, dispose } = useKeypressListener();

function clear() {
  pressedKeys.value = [];
}

function startClear() {
  timerId.value = setTimeout(clear, CLEAR_TIME);
}

function onKeyPressed(event: PressedEvent) {
  clearTimeout(timerId.value);
  pressedKeys.value.push(event.payload.replace(regex, ""));
  startClear();
}

async function init() {
  try {
    unlisten = await listen(onKeyPressed);
  }
  catch (error) {
    console.error("Failed to initialize PressedKey", error);
  }
}

async function _dispose() {
  clearTimeout(timerId.value);
  clear();
  unlisten?.();
  dispose();

  unlisten = undefined;
}

onMounted(init);
onUnmounted(_dispose);
</script>

<template>
  <PressedKeyList :pressed-keys="pressedKeys" />
</template>
