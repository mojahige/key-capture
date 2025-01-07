<script setup lang="ts">
import { useTemplateRef, watch } from "vue";

const { activate } = defineProps<{
  activate?: boolean;
}>();

const scopeRef = useTemplateRef("scope");

function getFocusInfo() {
  const candidates = Array.from(scopeRef.value?.querySelectorAll("a") ?? []);
  const currentIndex = candidates.findIndex(candidate => candidate.matches(":focus"));

  return {
    candidates,
    currentIndex,
  };
}

function focusFirst() {
  scopeRef.value?.querySelector("a")?.focus();
}

function focusLast() {
  Array.from(scopeRef.value?.querySelectorAll("a") ?? []).at(-1)?.focus();
}

function focusNext() {
  const { candidates, currentIndex } = getFocusInfo();

  if (currentIndex < 0) {
    return;
  }

  const candidateIndex = currentIndex + 1;

  if (candidateIndex > candidates.length - 1) {
    focusFirst();
    return;
  }

  candidates.at(candidateIndex)?.focus();
}

function focusPrevious() {
  const { candidates, currentIndex } = getFocusInfo();

  if (currentIndex < 0) {
    return;
  }

  const candidateIndex = currentIndex - 1;

  if (candidateIndex < 0) {
    focusLast();
    return;
  }

  candidates.at(candidateIndex)?.focus();
}

function disableTabKey(event: KeyboardEvent) {
  if (event.key.toLowerCase() !== "tab") {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
}

function goToPrevious() {
  focusPrevious();
}

function goToNext() {
  focusNext();
}

function onChangeActivate() {
  if (activate) {
    focusFirst();
    document.addEventListener("keydown", disableTabKey);
  }
  else {
    document.removeEventListener("keydown", disableTabKey);
  }
}

watch(() => activate, onChangeActivate);
</script>

<template>
  <div
    ref="scope"
    @keydown.stop.prevent.up="goToPrevious"
    @keydown.stop.prevent.down="goToNext"
  >
    <slot />
  </div>
</template>
