import { afterEach, describe, expect, it, vi } from "vitest";
import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/utils/storage";

describe("storage utils", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("saves and loads JSON values", () => {
    saveToStorage("key", { a: 1 });
    expect(loadFromStorage("key", null)).toEqual({ a: 1 });
  });

  it("returns the fallback when the key doesn't exist", () => {
    expect(loadFromStorage("missing", ["fallback"])).toEqual(["fallback"]);
  });

  it("returns the fallback when the stored value is corrupted", () => {
    window.localStorage.setItem("broken", "{not json");
    expect(loadFromStorage("broken", 42)).toBe(42);
  });

  it("removes values", () => {
    saveToStorage("key", "value");
    removeFromStorage("key");
    expect(loadFromStorage("key", null)).toBeNull();
  });

  it("doesn't throw when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => saveToStorage("key", "value")).not.toThrow();
  });
});
