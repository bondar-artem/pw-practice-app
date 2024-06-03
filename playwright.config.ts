import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 10000, // Set global timeout to 10 seconds.
  // globalTimeout: 60000, // Set global default timeout to 60 seconds.

  expect: {
    timeout: 2000,
    toMatchSnapshot: {maxDiffPixels: 50}
  },

  retries: 1,
  reporter: [
    ['json', { outputFile: 'test-results/jsonResport.json' }],
    ['junit', { outputFile: 'test-results/junitResport.xml' }],
    // ['allure-playwright'],
    ['html']
  ],

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
      : process.env.STAGING == '1' ? 'http://localhost:4202/'
        : 'http://localhost:4200/',
    trace: 'on-first-retry',
    actionTimeout: 5000,
    navigationTimeout: 5000,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 },
    }
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/'
      },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        video: {
          mode: 'on',
          size: { width: 1920, height: 1080 },
        }
      },
    },

    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 },
      }
    },

    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 13 Pro'],
        // viewport: { width: 414, height: 800 },
      }
    }
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200'
  }
});
