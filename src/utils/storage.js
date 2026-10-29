/**
 * Small wrapper around localStorage. Browsers can block storage (private
 * mode, disabled cookies...), so every access is guarded and the app keeps
 * working, it just won't remember changes after a reload.
 */

/**
 * @param {string} key
 * @param {*} fallback - Value returned when nothing valid is stored.
 * @returns {*}
 */
export function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * @param {string} key
 * @param {*} value - Any JSON serializable value.
 */
export function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable or full: ignore, the in-memory state still works.
  }
}

/**
 * @param {string} key
 */
export function removeFromStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore, see saveToStorage.
  }
}
