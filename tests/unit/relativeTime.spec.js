import { describe, expect, it } from "vitest";
import { formatRelativeTime } from "@/utils/relativeTime";

const NOW = new Date("2026-10-29T12:00:00.000Z");
const secondsAgo = (seconds) => new Date(NOW.getTime() - seconds * 1000);

describe("formatRelativeTime", () => {
  it("returns 'just now' for very recent dates", () => {
    expect(formatRelativeTime(secondsAgo(10), NOW)).toBe("just now");
  });

  it("formats minutes, hours and days", () => {
    expect(formatRelativeTime(secondsAgo(5 * 60), NOW)).toBe("5 minutes ago");
    expect(formatRelativeTime(secondsAgo(3 * 3600), NOW)).toBe("3 hours ago");
    expect(formatRelativeTime(secondsAgo(3 * 86400), NOW)).toBe("3 days ago");
  });

  it("uses natural words when available", () => {
    expect(formatRelativeTime(secondsAgo(86400), NOW)).toBe("yesterday");
    expect(formatRelativeTime(secondsAgo(400 * 86400), NOW)).toBe("last year");
  });

  it("accepts ISO strings", () => {
    expect(formatRelativeTime("2026-10-29T11:00:00.000Z", NOW)).toBe(
      "1 hour ago",
    );
  });

  it("returns an empty string for invalid dates", () => {
    expect(formatRelativeTime("not a date", NOW)).toBe("");
  });
});
