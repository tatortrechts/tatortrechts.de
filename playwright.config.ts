import { defineConfig } from "@playwright/test";

const MOCK_API_PORT = 8001;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "on-first-retry",
  },
  reporter: [
    ["list"],
    ["html", { open: "on-failure" }],
  ],
  webServer: [
    {
      command: `node e2e/mock-api.mjs`,
      port: MOCK_API_PORT,
      reuseExistingServer: false,
      env: {
        MOCK_API_PORT: String(MOCK_API_PORT),
      },
    },
    {
      command: `NEXT_PUBLIC_API_URL=http://localhost:${MOCK_API_PORT} npx next dev --port 3000`,
      port: 3000,
      reuseExistingServer: true,
      timeout: 60000,
    },
  ],
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
