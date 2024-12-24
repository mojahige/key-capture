// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use device_query::{DeviceQuery, DeviceState};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
use tauri::AppHandle;
use tauri::Emitter;

#[tauri::command]
fn start_keypress_listener(app_handle: AppHandle, state: tauri::State<Arc<Mutex<bool>>>) {
    {
        let mut is_running = state.lock().unwrap();
        if *is_running {
            println!("Keypress listener is already running.");
            return;
        }
        *is_running = true;
    }

    let device_state = DeviceState::new();
    let app_handle = Arc::new(app_handle);
    let state = state.inner().clone();

    thread::spawn(move || {
        let last_keys = Arc::new(Mutex::new(vec![]));

        loop {
            {
                let is_running = state.lock().unwrap();
                if !*is_running {
                    break;
                }
            }

            let current_keys = device_state.get_keys();
            let mut last_keys_guard = last_keys.lock().unwrap();

            for key in &current_keys {
                if !last_keys_guard.contains(key) {
                    app_handle.emit("pressed", format!("{:?}", key)).unwrap();
                }
            }
            *last_keys_guard = current_keys;

            thread::sleep(Duration::from_millis(50));
        }

        println!("Keypress listener stopped.");
    });
}

#[tauri::command]
fn stop_keypress_listener(state: tauri::State<Arc<Mutex<bool>>>) {
    let mut is_running = state.lock().unwrap();
    if *is_running {
        *is_running = false;
        println!("Keypress listener stopping...");
    } else {
        println!("Keypress listener is not running.");
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let listener_state = Arc::new(Mutex::new(false));

    tauri::Builder::default()
        .manage(listener_state.clone())
        .invoke_handler(tauri::generate_handler![
            start_keypress_listener,
            stop_keypress_listener
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
