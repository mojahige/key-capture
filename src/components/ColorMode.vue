<script setup lang="ts">
import { ref, useId, watch } from "vue";
import { useColorModeStore, type ColorModeType } from "../stores/color-mode";

type ColorModeValue = ColorModeType | "system";

const { colorMode, userColorMode, setUserColorMode, useSystemColorScheme } = useColorModeStore();
const initialModeValue: ColorModeValue = (!userColorMode || !colorMode) ? "system" : colorMode;
const mode = ref<ColorModeValue>(initialModeValue);
const groupLabelId = useId();

watch(mode, () => {
  const value = mode.value;

  if (value === "system") {
    useSystemColorScheme();
    return;
  }

  setUserColorMode(value);
});
</script>

<template>
  <div role="radiogroup" :aria-labelledby="groupLabelId">
    <p :id="groupLabelId">Color mode</p>

    <div class="controls">
      <label>
        Light
        <input type="radio" v-model="mode" name="color-mode" value="light">
      </label>

      <label>
        Dark
        <input type="radio" v-model="mode" name="color-mode" value="dark">
      </label>

      <label>
        System
        <input type="radio" v-model="mode" name="color-mode" value="system">
      </label>
    </div>
  </div>
</template>

<style scoped>
  .controls {
    display: grid;
    gap: 0.5rem;
  }

  label {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
</style>
