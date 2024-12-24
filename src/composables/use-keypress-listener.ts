import { invoke } from "@tauri-apps/api/core";
import { listen as _listen } from "@tauri-apps/api/event";
import type { Event } from "@tauri-apps/api/event";

export type PressedPayload = string;
export type PressedEvent = Event<PressedPayload>;
export type PressedHandler = (event: PressedEvent) => void;

export function useKeypressListener() {
  async function listen(pressedHandler: PressedHandler) {
    await invoke("start_keypress_listener");

    return _listen("pressed", pressedHandler);
  }

  async function dispose() {
    await invoke("stop_keypress_listener");
  }

  return {
    listen,
    dispose,
  };
}
