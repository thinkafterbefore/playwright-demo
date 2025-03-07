import { PlaywrightTestConfig, devices } from "@playwright/test";
import path from "path";
import { playwrightCustomMatchers } from "./playwright-custom-matchers";
require("dotenv").config({ path: "./playwright/.env" });

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, "playwright"),
  retries: 2,
  forbidOnly: !!process.env.CI,
  outputDir: "playwright/test-results/",
  reporter: [["html", { outputFolder: "playwright/test-report/" }]],
  workers: 2,

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: "npm run start",
    port: 3000,
    reuseExistingServer: !process.env.CI
  },

  use: {
    contextOptions: { ignoreHTTPSErrors: true },
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    headless: true,
    trace: "on",
    video: "on",
    screenshot: "on",

    httpCredentials: { username: "admin", password: "admin" }
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: "Desktop Safari",
      use: { ...devices["Desktop Safari"] }
    }
  ]
};

playwrightCustomMatchers();

export default config;
