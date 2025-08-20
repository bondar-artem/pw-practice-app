import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './test_options';


 import dotenv from 'dotenv';
 import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig<TestOptions>({
  timeout: 40000,
 // globalTimeout: 60000,

  expect:{
    timeout: 5000,
  },

  retries: 0,
  reporter: [['json', {outputFile: 'test-results/results.json'}],
['junit', {outputFile: 'test-results/results.xml'}],
// ['allure-playwright']
['html'] ],


  use: {
     globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
     baseURL: process.env.DEV === '1' ? "http://localhost:4200"
        : process.env.STAGING === '1' ? "http://localhost:4200"
        : "http://localhost:4200",

    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    },
    screenshot: {
      mode: 'off',
      fullPage: true
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
        video: {
        mode: 'on',
        size: { width: 1920, height: 1080 }
      }
      },
      fullyParallel: true,
      timeout: 6000,
      
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'pageObjectFullscreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: {width: 2048, height: 1080}
      }
    }
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
  }
});
