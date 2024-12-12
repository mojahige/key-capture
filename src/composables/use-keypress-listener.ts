import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { ref } from "vue";
import type { Event, UnlistenFn } from "@tauri-apps/api/event";

export type PressedPayload = string;
export type PressedEvent = Event<PressedPayload>;
export type PressedHandler = (event: PressedEvent) => void;

export function useKeypressListener() {
  const unlisten = ref<UnlistenFn>();

  async function init(pressedHandler: PressedHandler) {
    await invoke("keypress_listener");

    unlisten.value = await listen("pressed", pressedHandler);
  }

  return {
    init,
    unlisten,
  };
}
