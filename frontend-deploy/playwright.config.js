// playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright",
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    browserName: "chromium",
  },
});
