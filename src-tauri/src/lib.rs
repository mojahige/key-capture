// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use device_query::{DeviceQuery, DeviceState};
use std::sync::{Arc, Mutex};
use std::sync::atomic::{AtomicBool, Ordering};
use std::thread;
use std::time::Duration;
use tauri::AppHandle;
use tauri::Emitter;

static LISTENER_STARTED: AtomicBool = AtomicBool::new(false);

#[tauri::command]
fn keypress_listener(app_handle: AppHandle) {
    if LISTENER_STARTED.load(Ordering::SeqCst) {
        println!("Keypress listener is already running.");
        return;
    }

    LISTENER_STARTED.store(true, Ordering::SeqCst);

    let device_state = DeviceState::new();
    let app_handle = Arc::new(app_handle);

    thread::spawn(move || {
        let last_keys = Arc::new(Mutex::new(vec![]));

        loop {
            let current_keys = device_state.get_keys();
            let mut last_keys_guard = last_keys.lock().unwrap();

            for key in &current_keys {
                if !last_keys_guard.contains(key) {
                    app_handle.emit("pressed", format!("{:?}", key)).unwrap();
                }
            }
            *last_keys_guard = current_keys;

            thread::sleep(Duration::from_millis(50));

            if !LISTENER_STARTED.load(Ordering::SeqCst) {
                break;
            }
        }

        println!("Keypress listener stopped.");
    });
}

#[tauri::command]
fn stop_keypress_listener() {
    LISTENER_STARTED.store(false, Ordering::SeqCst);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![keypress_listener, stop_keypress_listener])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
