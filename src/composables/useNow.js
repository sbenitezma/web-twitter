import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Reactive "current time" that refreshes on an interval, so relative dates
 * ("just now" → "2 minutes ago") update without reloading the page.
 *
 * @param {number} [intervalMs=60000]
 * @returns {import("vue").Ref<Date>}
 */
export function useNow(intervalMs = 60_000) {
  const now = ref(new Date());
  let timerId;

  onMounted(() => {
    timerId = setInterval(() => {
      now.value = new Date();
    }, intervalMs);
  });

  onBeforeUnmount(() => clearInterval(timerId));

  return now;
}
