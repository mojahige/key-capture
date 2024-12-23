import { defineStore } from "pinia";
import { ref } from "vue";

export type ColorModeType = "light" | "dark";
type ColorMode = ColorModeType | undefined;

export const useColorModeStore = defineStore("colorMode", () => {
  const systemColorMode = ref<ColorMode>(undefined);
  const userColorMode = ref<ColorMode>(undefined);
  const colorMode = ref<ColorMode>(undefined);
  const systemSchemeMatchMedia = window.matchMedia("(prefers-color-scheme: dark)");

  systemColorMode.value = systemSchemeMatchMedia.matches ? "dark" : "light";

  function onChangeSystemColorMode(event: MediaQueryListEvent) {
    systemColorMode.value = event.matches ? "dark" : "light";

    updateColorMode();
  }

  function updateColorMode() {
    colorMode.value = userColorMode.value ?? systemColorMode.value;

    updateColorSchemeStyle();
  }

  function setUserColorMode(mode: ColorMode) {
    userColorMode.value = mode;

    updateColorMode();
  }

  function useSystemColorScheme() {
    userColorMode.value = undefined;

    updateColorMode();
  }

  function updateColorSchemeStyle() {
    const mode = colorMode.value;

    if (!mode) {
      return;
    }

    document.documentElement.style.colorScheme = mode;
  }

  function dispose() {
    systemSchemeMatchMedia.removeEventListener("change", onChangeSystemColorMode);
  }

  function init() {
    systemSchemeMatchMedia.addEventListener("change", onChangeSystemColorMode);
    updateColorMode();
  }

  init();

  return {
    colorMode,
    userColorMode,
    setUserColorMode,
    useSystemColorScheme,
    dispose,
  };
});
